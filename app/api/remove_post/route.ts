import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

import EventPost from "@/lib/db/models/post";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized: No session or API key" }, { status: 401 });
    }
    
    try {
        const { targetId } = await req.json();

        console.log("on the server, recieved target id", targetId);
        
        const id = parseInt(targetId, 10);
        const post = await EventPost.findByPk(id)
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        if (post.ownerId !== session.user.email) {
            return NextResponse.json({ error: "Can only remove your own posts." }, { status: 403 });
        }

        await post.destroy();

        return NextResponse.json({ status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}