import { getSession } from "next-auth/react";
import { type ComposableMiddleware } from "next-compose-middleware";
import { NextResponse } from "next/server";

/**
 * 認証していない場合にログイン画面にリダイレクトするミドルウェア
 * @param req NextRequest
 * @param res NextResponse
 */
export const authMiddleware: ComposableMiddleware = async (req, res) => {
  const session = await getSession({
    req: {
      headers: {
        cookie: req.headers.get("cookie") ?? undefined,
      },
    },
  });
  if (!session) {
    const callbackUrl = encodeURI(req.url);
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, req.url),
    );
  }
  return res;
};
