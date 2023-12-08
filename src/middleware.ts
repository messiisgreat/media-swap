import { composeMiddleware } from "next-compose-middleware";
import { type NextRequest, NextResponse } from "next/server";

/**
 * scripts に ミドルウェア を追加する
 * @param req NextRequest
 * @returns NextResponse.redirect | void
 */
export async function middleware(req: NextRequest) {
  return await composeMiddleware(req, NextResponse.next(), {
    scripts: [],
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|opengraph-image.png).*)",
  ],
};
