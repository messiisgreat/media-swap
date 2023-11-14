import { env } from "@/utils/env";
import { getToken } from "next-auth/jwt";
import { ComposableMiddleware } from "next-compose-middleware";
import { NextResponse } from "next/server";

/**
 * 認証していない場合にログイン画面にリダイレクトするミドルウェア
 * @param req NextRequest
 * @param res NextResponse
 */
export const authMiddleware: ComposableMiddleware = async (req, res) => {
  const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
  if (!token) {
    const pathName = new URL(req.url).pathname;
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${encodeURI(pathName)}`, req.url),
    );
  }
  return res;
};
