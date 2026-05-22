export async function parseEventDetails(
  title: string,
  description: string,
  location: string
): Promise<string[]> {
  const response = await fetch("/api/match_tags", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, location }),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate tags: HTTP ${response.status}`);
  }

  const data = (await response.json()) as { tags: string[] };
  return data.tags;
}
