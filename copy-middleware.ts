import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; 
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";


export async function middleware(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
