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
  const pathName = new URL(req.url).pathname;

  const isAgeCheckedThrough = req.cookies.get("isAgeCheckedThrough")?.value;

  if (isAgeCheckedThrough === undefined) {
    return redirectToAgeCheck(req);
  }

  if (
    isAgeCheckedThrough === "true" &&
    (pathName === "/age-check" || pathName === "/no-available-service")
  ) {
    return redirectToHome(req);
  }
}

export const config = {
  matcher: [
    /**年齢確認画面、サービス利用不可画面、関連アセット以外にマッチ */
    "/((?!age-check|no-available-service|api|_next/static|_next/image|favicon.ico).*)",
  ],
};
