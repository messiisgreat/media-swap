import { ageCheckMiddleware } from "@/middlewares/ageCheck";
import { composeMiddleware } from "next-compose-middleware";
import { NextRequest, NextResponse } from "next/server";

/**
 * 年齢認証を通過していない場合に年齢認証画面にリダイレクトするミドルウェア
 * @param req NextRequest
 * @returns NextResponse.redirect | void
 */
export async function middleware(req: NextRequest) {
  const userAgent = req.headers.get("user-agent");
  if (userAgent?.includes("facebookexternalhit")) {
    return NextResponse.next();
  }
  return composeMiddleware(req, NextResponse.next(), {
    scripts: [ageCheckMiddleware],
    // "/add-listing": {
    //   scripts: [authMiddleware],
    // },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|opengraph-image.png |res.cloudinary.com).*)",
  ],
};
