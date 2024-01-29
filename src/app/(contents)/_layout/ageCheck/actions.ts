"use server";

import { COOKIES_ENUM } from "@/utils/cookies/const";
import { setCookie } from "@/utils/cookies/server";

/**
 * 年齢確認済みフラグをCookieに追加する.
 * 購入などにはログインが必要で,
 * この cookie はサイト閲覧の可否のみを判断するため,
 * httpOnly や secure などのオプションはつけない.
 */
export const addAgeCheckedCookie = () => {
  setCookie(COOKIES_ENUM.AGE_CHECK, "true", {
    maxAge: 60 * 60 * 24 * 30, // 30日間
  });
};
