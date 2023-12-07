"use server";

import { cookies } from "next/headers";

import { ageCheckCookieKey } from "@/app/(contents)/_layout/ageCheck/constants";

/**
 * 年齢確認済みフラグをCookieに追加する.
 * 購入などにはログインが必要で,
 * この cookie はサイト閲覧の可否のみを判断するため,
 * httpOnly や secure などのオプションはつけない.
 */
export const addAgeCheckedCookie = () => {
  cookies().set(ageCheckCookieKey, "true", {
    maxAge: 60 * 60 * 24 * 30, // 30日間
  });
};
