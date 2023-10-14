import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";
import { authOptions } from "./app/api/auth/[...nextauth]/route";

export async function middleware(req: NextRequest) {
    return NextResponse.redirect(new URL('/age-check', req.url))
}

export const config = {
    matcher: [
        '/',
        '/products/:path*',
    ],
}