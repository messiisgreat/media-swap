import { type CookieKey } from "@/utils/cookies/const";
import { useCookies, type CookieAttributes } from "next-client-cookies";

/**
 * Cookieを安全に取得するためのカスタムフック
 * COOKIES_ENUMを参照してCookieのキーを指定する
 * @param key CookieKey
 */
export const useCookie = (key: CookieKey) => {
  const cookies = useCookies();
  const cookieValue = cookies.get(key);

  const setCookie = (value: string, options?: CookieAttributes) => {
    cookies.set(key, value, options);
  };
  const removeCookie = (options?: CookieAttributes) => {
    cookies.remove(key, options);
  };
  return [
    /** 取得した値 */
    cookieValue,
    /**
     *  Cookieをセットする関数
     * @param value Cookieにセットする値
     * @param optinos Cookieのオプション
     */
    setCookie,
    /** Cookieを削除する関数 */
    removeCookie,
  ] as const;
};
