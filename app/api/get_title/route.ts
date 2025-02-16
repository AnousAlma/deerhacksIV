import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

import { getById as getPostById, create as createPost } from "@/lib/db/dal/post";
import EventPost from "@/lib/db/models/post";

export async function GET(req: Request, { params }: { params: { title: string } }) {
    console.log(params)
    const title = params.title


    if (!title) {
        return NextResponse.json({ error: "Post title is required" }, { status: 400 });
    }
    const post = await EventPost.findOne({
            where: {
                title: title
            },
            attributes: ['previewUrl']
        });
    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const p = post.previewUrl;

    return NextResponse.json({ p });
}