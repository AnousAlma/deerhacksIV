import { NextResponse } from "next/server";
import { matchEventTags } from "@/lib/utils/matchEventTags";

export async function POST(req: Request) {
  try {
    const { title, description, organizer, location } = await req.json();

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "title is required" },
        { status: 400 }
      );
    }

    const result = await matchEventTags({
      title,
      description,
      organizer,
      location,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("OpenAI tag matching failed:", error);

    return NextResponse.json(
      { error: "Failed to match event tags" },
      { status: 500 }
    );
  }
}
