import { useCookies } from "next-client-cookies";

import { ageCheckCookieKey } from "@/app/_layout/ageCheck/constants";

/**
 * 年齢確認済みフラグをCookieから取得する
 * @returns isAgeCheckedThrough
 */
export const useAgeCheckCookie = () => {
  const cookies = useCookies();

  const isAgeCheckedThrough = cookies.get(ageCheckCookieKey)
    ? cookies.get(ageCheckCookieKey) === "true"
    : false;

  return {
    isAgeCheckedThrough,
  };
};
