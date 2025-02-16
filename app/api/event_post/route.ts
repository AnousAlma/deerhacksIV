import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

import { getById as getPostById, create as createPost } from "@/lib/db/dal/post";
import EventPost from "@/lib/db/models/post";

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

    console.log("API KEY", apiKey, "dog", apiKey === "dog", apiKey !== null && apiKey !== "dog");

    // api key exists and is not correct, or api key does not exist and session is not provided
    if (apiKey !== null && apiKey !== "dog") {
        return NextResponse.json({ error: "Unauthorized: Invalid API key" }, { status: 401 });
    }
    else if (apiKey === null) {
        console.log("USING SESSION")
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized: No session or API key" }, { status: 401 });
        }
    }



    try {
        const { title, description, startDate, endDate, location } = await req.json();

        if (!title || !description || !startDate || !location) {
            return NextResponse.json({ error: "title, description, startDate, endDate and location are required" }, { status: 400 });
        }
        console.log({ title, description, startDate, location })
        const newPost = await EventPost.create({ title, description, startDate, endDate, location });
        console.log("NEW POST", newPost)
        return NextResponse.json({ message: "Post created", post: newPost }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}