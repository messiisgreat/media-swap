"use server";

import { cookies } from "next/headers";

/**
 * 年齢確認済みフラグをCookieに追加する
 * @returns {Promise<void>}
 * @todo Promiseを返していない気がするのでasync不要では？
 */
export const addAgeCheckedCookie = async (): Promise<void> => {
  cookies().set("isAgeCheckedThrough", "true");
};
