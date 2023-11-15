import { env } from "@/utils/env";

/**
 * 認証の結果を取得する
 * @param captchaValue Security Verifireで取得した値
 * @returns 認証の結果
 */
export const fetchVerifyResult = async (captchaValue: string) => {
  const url = "https://www.google.com/recaptcha/api/siteverify";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: env.GOOGLE_RECAPTCHA_SECRET_KEY,
        response: captchaValue,
      }).toString(),
    });
    const json = await response.json();

    if (!json.success) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
