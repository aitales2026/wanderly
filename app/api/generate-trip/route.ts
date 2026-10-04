import { NextResponse } from "next/server";
import { generateTrip } from "@/lib/ai";
import { tripRequestSchema } from "@/lib/schema";

export const maxDuration = 60;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = tripRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_request" },
      { status: 400 }
    );
  }

  try {
    const trip = await generateTrip(parsed.data);
    return NextResponse.json({ trip });
  } catch (error) {
    console.error("[generate-trip] failed:", error);
    return NextResponse.json(
      { error: "generation_failed" },
      { status: 500 }
    );
  }
}
