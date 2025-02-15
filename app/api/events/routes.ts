import { NextResponse } from "next/server";

export async function GET() {
  // Hardcode or fetch from a DB
  const events = [
    { id: 1, title: "Event A", description: "..." },
    { id: 2, title: "Event B", description: "..." },
  ];

  return NextResponse.json(events);
}
