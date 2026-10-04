import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText } from "ai";
import { jsonrepair } from "jsonrepair";
import { tripSchema } from "./schema";
import { buildSystemPrompt, buildTripPrompt } from "./trip-prompt";
import type { Trip, TripRequest } from "@/types/trip";

const ark = createOpenAICompatible({
  name: "volcengine-ark",
  baseURL: process.env.ARK_BASE_URL ?? "https://ark.cn-beijing.volces.com/api/coding/v3",
  apiKey: process.env.ARK_API_KEY,
  // Reasoning models (e.g. deepseek-v4.1-flash) burn the output token budget on
  // chain-of-thought (observed: 9.4k reasoning tokens alone), which truncated or
  // emptied the JSON payload and pushed latency past 60s. Disabling thinking
  // brings a 7-day trip from ~69s to ~22s. Set ARK_ENABLE_THINKING=1 to restore.
  ...(process.env.ARK_ENABLE_THINKING
    ? {}
    : {
        transformRequestBody: (body: Record<string, unknown>) => ({
          ...body,
          thinking: { type: "disabled" },
        }),
      }),
});

function getModel() {
  const modelId = process.env.AI_MODEL;
  if (!modelId) {
    throw new Error("AI_MODEL is not configured");
  }
  return ark.chatModel(modelId);
}

// ---------------------------------------------------------------------------
// Error classification (server-side logging only, never sent to the client)
// ---------------------------------------------------------------------------

type TripErrorKind = "truncated" | "parse_failed" | "schema_failed" | "provider_error";

class TripGenerationError extends Error {
  constructor(public kind: TripErrorKind) {
    super(kind);
  }
}

function logFailure(kind: TripErrorKind, detail: string, text: string): void {
  const head = text.slice(0, 100).replace(/\n/g, "\\n");
  const tail = text.slice(-100).replace(/\n/g, "\\n");
  console.error(`[ai] ${kind}: ${detail} (len=${text.length}) head="${head}" tail="${tail}"`);
}

// ---------------------------------------------------------------------------
// Layer 1: text normalization
//
// Single-pass scanner that only rewrites characters in *structural* positions
// (outside string literals), so Chinese punctuation inside content is kept:
//   - strip BOM / zero-width characters
//   - full-width quotes used as delimiters  ->  "
//   - full-width , and : used as separators ->  , and :
//   - drop trailing commas before } / ]
// ---------------------------------------------------------------------------

const ZERO_WIDTH = /[\u200B\u200C\u200D\uFEFF]/g;
// full-width quotes: “ ” ‘ ’ — models may use any of them (even the same
// character) as both opening and closing delimiter
const FW_QUOTES = new Set(["\u201c", "\u201d", "\u2018", "\u2019"]);

function normalize(text: string): string {
  const cleaned = text.replace(ZERO_WIDTH, "");
  let out = "";
  let inString = false;
  let fwString = false;

  for (let i = 0; i < cleaned.length; i++) {
    const ch = cleaned[i];

    if (inString) {
      if (fwString) {
        // any full-width quote closes a full-width string
        if (FW_QUOTES.has(ch)) {
          inString = false;
          out += '"';
        } else {
          out += ch;
        }
        continue;
      }
      if (ch === "\\") {
        out += ch + (cleaned[i + 1] ?? "");
        i++;
        continue;
      }
      if (ch === '"') {
        inString = false;
        out += '"';
        continue;
      }
      out += ch;
      continue;
    }

    if (ch === '"') {
      inString = true;
      fwString = false;
      out += '"';
      continue;
    }
    if (FW_QUOTES.has(ch)) {
      inString = true;
      fwString = true;
      out += '"';
      continue;
    }

    switch (ch) {
      case "\uff0c": // ，
        out += ",";
        break;
      case "\uff1a": // ：
        out += ":";
        break;
      case ",": {
        // trailing comma before a closing brace/bracket -> drop it
        let j = i + 1;
        while (j < cleaned.length && /\s/.test(cleaned[j])) j++;
        if (cleaned[j] !== "}" && cleaned[j] !== "]") out += ",";
        break;
      }
      default:
        out += ch;
    }
  }

  return out;
}

// ---------------------------------------------------------------------------
// Layer 2: balanced-brace extraction
//
// Finds every top-level balanced {...} object (skipping braces inside string
// literals) and returns the largest one. Handles prose around the JSON,
// markdown fences, and multiple JSON blocks (picks the real payload).
// ---------------------------------------------------------------------------

function extractBalancedJson(text: string): string | null {
  let best = "";
  let depth = 0;
  let start = -1;
  let inString = false;
  let escaped = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') {
      inString = true;
    } else if (ch === "{") {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 0 && start !== -1) {
        const candidate = text.slice(start, i + 1);
        if (candidate.length > best.length) best = candidate;
        start = -1;
      }
      if (depth < 0) depth = 0;
    }
  }

  return best || null;
}

// ---------------------------------------------------------------------------
// Layer 4: safe soft repair (before Zod validation)
//
// Only fixes formatting, never invents content:
//   - trim string fields
//   - renumber days 1..n, truncate extra days beyond duration
//   - "9:00" -> "09:00", lowercase category
// ---------------------------------------------------------------------------

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeTime(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const m = value.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return value.trim();
  return `${m[1].padStart(2, "0")}:${m[2]}`;
}

function softRepair(parsed: unknown): unknown {
  if (!isRecord(parsed)) return parsed;
  const out: Record<string, unknown> = { ...parsed };

  for (const key of ["destination", "title", "summary"] as const) {
    if (typeof out[key] === "string") out[key] = (out[key] as string).trim();
  }

  if (Array.isArray(out.tips)) {
    out.tips = (out.tips as unknown[])
      .filter((t): t is string => typeof t === "string" && t.trim().length > 0)
      .map((t) => t.trim());
  }

  if (Array.isArray(out.days)) {
    let days = (out.days as unknown[]).filter(isRecord);
    const duration = typeof out.duration === "number" ? out.duration : days.length;
    if (days.length > duration) days = days.slice(0, duration);

    out.days = days.map((d, i) => {
      const day: Record<string, unknown> = { ...d, day: i + 1 };
      for (const key of ["title", "summary"] as const) {
        if (typeof day[key] === "string") day[key] = (day[key] as string).trim();
      }
      if (Array.isArray(day.activities)) {
        day.activities = (day.activities as unknown[]).filter(isRecord).map((a) => {
          const act: Record<string, unknown> = { ...a };
          for (const key of ["time", "name", "description", "location", "duration", "category"] as const) {
            if (typeof act[key] === "string") act[key] = (act[key] as string).trim();
          }
          act.time = normalizeTime(act.time);
          if (typeof act.category === "string") act.category = act.category.toLowerCase();
          return act;
        });
      }
      return day;
    });
  }

  return out;
}

// ---------------------------------------------------------------------------
// Layers 0-4 pipeline
// ---------------------------------------------------------------------------

function parseTrip(text: string): Trip {
  const normalized = normalize(text);
  const extracted = extractBalancedJson(normalized) ?? normalized;

  let parsed: unknown;
  try {
    parsed = JSON.parse(extracted);
  } catch (error) {
    try {
      parsed = JSON.parse(jsonrepair(extracted));
    } catch {
      logFailure("parse_failed", String(error), text);
      throw new TripGenerationError("parse_failed");
    }
  }

  const direct = tripSchema.safeParse(parsed);
  if (direct.success) return direct.data;

  const second = tripSchema.safeParse(softRepair(parsed));
  if (second.success) {
    console.warn(
      "[ai] schema soft-repair rescued output, failed fields:",
      direct.error.issues.map((i) => i.path.join(".")).join(", ")
    );
    return second.data;
  }

  logFailure(
    "schema_failed",
    second.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "),
    text
  );
  throw new TripGenerationError("schema_failed");
}

// ---------------------------------------------------------------------------
// Layer 5: smart retry with corrective guidance
// ---------------------------------------------------------------------------

function correctiveGuidance(kind: TripErrorKind | null): string {
  switch (kind) {
    case "parse_failed":
    case "schema_failed":
      return `\n\n特别注意：你上一次的输出无法被正确解析。请只输出纯 JSON：不要 markdown 代码块，不要任何解释文字，所有字符串一律使用半角双引号，不要在数组或对象末尾多加逗号，days 数组长度必须恰好等于旅行天数。`;
    case "truncated":
      return `\n\n特别注意：你上一次的输出因长度限制被截断了。请压缩输出：每个活动的 description 控制在 40 字以内，tips 最多 4 条且每条不超过 40 字。`;
    default:
      return "";
  }
}

async function callModel(request: TripRequest, priorKind: TripErrorKind | null): Promise<Trip> {
  const result = await generateText({
    model: getModel(),
    system: buildSystemPrompt() + correctiveGuidance(priorKind),
    prompt: buildTripPrompt(request),
    maxOutputTokens: 16384,
    temperature: priorKind ? 0.3 : 0.7,
    // We run our own retry loop with corrective guidance; the SDK's internal
    // retries (3 attempts) would multiply provider calls and burn quota.
    maxRetries: 0,
  });

  if (result.finishReason === "length") {
    logFailure("truncated", `finishReason=length`, result.text);
    throw new TripGenerationError("truncated");
  }

  return parseTrip(result.text);
}

export async function generateTrip(request: TripRequest): Promise<Trip> {
  let lastKind: TripErrorKind | null = null;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      return await callModel(request, lastKind);
    } catch (error) {
      if (error instanceof TripGenerationError) {
        lastKind = error.kind;
        console.error(`[ai] attempt ${attempt} failed (${error.kind})`);
      } else {
        lastKind = "provider_error";
        console.error("[ai] provider_error:", error);
      }
    }
  }

  throw new Error("generation_failed");
}
