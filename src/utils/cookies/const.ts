import { getObjectKeys } from "@/utils/converter";

/** 重複しないよう、Objectとして定義したCookieのキー */
export const COOKIES_ENUM = {
  AGE_CHECK: "age_check",
} as const;

/** Cookieのキーの配列 */
export const COOKIE_KEYS = getObjectKeys(COOKIES_ENUM);

type CookieObjectKey = (typeof COOKIE_KEYS)[number];

/** 定数に登録済みのCookie値 */
export type CookieKey = (typeof COOKIES_ENUM)[CookieObjectKey];
