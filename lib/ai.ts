import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText } from "ai";
import { tripSchema } from "./schema";
import { buildSystemPrompt, buildTripPrompt } from "./trip-prompt";
import type { Trip, TripRequest } from "@/types/trip";

const ark = createOpenAICompatible({
  name: "volcengine-ark",
  baseURL: process.env.ARK_BASE_URL ?? "https://ark.cn-beijing.volces.com/api/coding/v3",
  apiKey: process.env.ARK_API_KEY,
});

function getModel() {
  const modelId = process.env.AI_MODEL;
  if (!modelId) {
    throw new Error("AI_MODEL is not configured");
  }
  return ark.chatModel(modelId);
}

function extractJson(text: string): string {
  // Try to find JSON block in the response (handles markdown code fences)
  const fenceMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (fenceMatch) return fenceMatch[1].trim();

  // Try to find raw JSON object
  const braceStart = text.indexOf("{");
  const braceEnd = text.lastIndexOf("}");
  if (braceStart !== -1 && braceEnd !== -1) {
    return text.slice(braceStart, braceEnd + 1);
  }

  return text.trim();
}

async function callWithRetry(request: TripRequest): Promise<Trip> {
  const result = await generateText({
    model: getModel(),
    system: buildSystemPrompt(),
    prompt: buildTripPrompt(request),
    maxOutputTokens: 8192,
    temperature: 0.7,
  });

  const jsonStr = extractJson(result.text);
  const parsed = JSON.parse(jsonStr);
  return tripSchema.parse(parsed);
}

export async function generateTrip(request: TripRequest): Promise<Trip> {
  try {
    return await callWithRetry(request);
  } catch (error) {
    console.error("[ai] first attempt failed, retrying:", error);
    return await callWithRetry(request);
  }
}
