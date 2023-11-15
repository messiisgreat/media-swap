import { exclude } from "@/middlewares/exclude";
import { ComposableMiddleware } from "next-compose-middleware";
import { NextResponse } from "next/server";

/**
 * 年齢認証を通過していない場合に年齢認証画面にリダイレクトするミドルウェア
 * @param req NextRequest
 * @param res NextResponse
 */
export const ageCheckMiddleware: ComposableMiddleware = async (req, res) => {
  const pathName = new URL(req.url).pathname;
  if (pathName.match(exclude)) return res;
  const isAgeCheckedThrough = req.cookies.get("isAgeCheckedThrough")?.value;
  if (isAgeCheckedThrough === undefined) {
    return NextResponse.redirect(new URL("/age-check", req.url));
  }
  if (isAgeCheckedThrough === "true" && pathName.match(exclude)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return res;
};
