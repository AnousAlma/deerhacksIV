import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

import { getById as getPostById, create as createPost } from "@/lib/db/dal/post";
import EventPost from "@/lib/db/models/post";
import { matchEventTags } from "@/lib/utils/matchEventTags";

function hasTags(tags: unknown): boolean {
    if (Array.isArray(tags)) return tags.length > 0;
    if (typeof tags === "string") return tags.trim().length > 0;
    return false;
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    console.log(params)
    const id = parseInt(params.id, 10);

    if (isNaN(id) || id <= 0) {
        return NextResponse.json({ error: "Invalid Post ID. Must be a positive integer." }, { status: 400 });
    }

    if (!id) {
        return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }
    const post = await getPostById(id);

    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
}



export async function POST(req: Request) {
    // authorize using api key or session
    const apiKey = req.headers.get("x-api-key");

    // api key exists and is not correct, or api key does not exist and session is not provided
    if (apiKey !== null && apiKey !== process.env.API_KEY) {
        return NextResponse.json({ error: "Unauthorized: Invalid API key" }, { status: 401 });
    }
    else if (apiKey === null) {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized: No session or API key" }, { status: 401 });
        }
    }



    try {
        const result = await req.json();
        const { title, description, startDate, endDate, location, ownerId, previewUrl, tags } = result;

        const data = { title, description, startDate, endDate, location, ownerId, previewUrl, tags };
        console.log("on the server, recieved package ", data);

        if (!title || !description || !startDate || !location) {
            return NextResponse.json({ error: "title, description, startDate and location are required" }, { status: 400 });
        }
        if (Array.isArray(tags)) {
            data.tags = tags.join(",");
        } else if (typeof tags === "string" && tags.trim()) {
            data.tags = tags.trim();
        }

        if (!hasTags(data.tags)) {
            try {
                const matched = await matchEventTags({
                    title,
                    description,
                    location,
                    organizer: ownerId,
                });
                data.tags = matched.tagsString;
            } catch (tagError) {
                console.error("Server-side tag generation failed:", tagError);
            }
        }

        const newPost = await EventPost.create(data);

        return NextResponse.json({ message: "Post created", post: newPost }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}