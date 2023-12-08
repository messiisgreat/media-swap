import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { type ComposableMiddleware } from "next-compose-middleware";

/**
 * 認証していない場合にログイン画面にリダイレクトするミドルウェア
 * @param req NextRequest
 * @param res NextResponse
 */
export const authMiddleware: ComposableMiddleware = async (req, res) => {
  const requestForNextAuth = {
    headers: {
      cookie: req.headers.get("cookie") ?? undefined,
    },
  };
  const session = await getSession({ req: requestForNextAuth });
  if (!session) {
    const pathName = new URL(req.url).pathname;
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${encodeURI(pathName)}`, req.url),
    );
  }
  return res;
};
