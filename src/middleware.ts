import { ageCheckMiddleware } from "@/middlewares/ageCheck";
import { authMiddleware } from "@/middlewares/auth";
import { composeMiddleware } from "next-compose-middleware";
import { NextRequest, NextResponse } from "next/server";

/**
 * 年齢認証画面にリダイレクトする
 * @param req NextRequest
 * @returns NextResponse.redirect
 */
async function redirectToAgeCheck(req: NextRequest) {
  return NextResponse.redirect(new URL("/age-check", req.url));
}

/**
 * ホーム画面にリダイレクトする
 * @param req NextRequest
 * @returns NextResponse.redirect
 */
async function redirectToHome(req: NextRequest) {
  return NextResponse.redirect(new URL("/", req.url));
}

/**
 * 年齢認証を通過していない場合に年齢認証画面にリダイレクトするミドルウェア
 * @param req NextRequest
 * @returns NextResponse.redirect | void
 */
export async function middleware(req: NextRequest) {
  return composeMiddleware(req, NextResponse.next(), {
    scripts: [ageCheckMiddleware],
    "/add-listing": {
      scripts: [authMiddleware],
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
