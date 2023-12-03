"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * 年齢確認済みフラグをCookieに追加する
 */
export const addAgeCheckedCookie = () => {
  cookies().set("isAgeCheckedThrough", "true");
  redirect("/");
};
