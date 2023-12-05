import { NextRequest, NextResponse } from "next/server";
import { composeMiddleware } from "next-compose-middleware";

import { ageCheckMiddleware } from "@/middlewares/ageCheck";

/**
 * 年齢認証を通過していない場合に年齢認証画面にリダイレクトするミドルウェア
 * @param req NextRequest
 * @returns NextResponse.redirect | void
 */
export async function middleware(req: NextRequest) {
  return composeMiddleware(req, NextResponse.next(), {
    scripts: [ageCheckMiddleware],
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|opengraph-image.png).*)",
  ],
};
