import OpenAI from "openai";
import { ALLOWED_TAGS } from "@/tags";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type MatchEventTagsInput = {
  title: string;
  description?: string;
  organizer?: string;
  location?: string;
};

export type MatchEventTagsResult = {
  tags: string[];
  tagsString: string;
  confidence?: number;
  reason?: string;
};

function cleanTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) return [];

  const allowed = new Set(ALLOWED_TAGS);

  return tags
    .map((tag) => String(tag).trim().toLowerCase())
    .filter((tag) => allowed.has(tag))
    .slice(0, 6);
}

export async function matchEventTags(
  input: MatchEventTagsInput
): Promise<MatchEventTagsResult> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const { title, description, organizer, location } = input;

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: `
You are an event tag classifier.

Your job:
- Choose 3 to 6 tags for a university event.
- Only choose tags from the allowed list.
- Do not invent new tags.
- Use lowercase only.
- Prefer specific tags over broad tags.
- Return JSON only.

Allowed tags:
${ALLOWED_TAGS.join(", ")}
        `.trim(),
      },
      {
        role: "user",
        content: `
Title: ${title}
Description: ${description ?? ""}
Organizer: ${organizer ?? ""}
Location: ${location ?? ""}
        `.trim(),
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "event_tag_match",
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            tags: {
              type: "array",
              minItems: 3,
              maxItems: 6,
              items: {
                type: "string",
                enum: ALLOWED_TAGS,
              },
            },
            confidence: {
              type: "number",
            },
            reason: {
              type: "string",
            },
          },
          required: ["tags", "confidence", "reason"],
        },
      },
    },
  });

  const parsed = JSON.parse(response.output_text) as {
    tags: unknown;
    confidence?: number;
    reason?: string;
  };
  const tags = cleanTags(parsed.tags);

  return {
    tags,
    tagsString: tags.join(","),
    confidence: parsed.confidence,
    reason: parsed.reason,
  };
}
