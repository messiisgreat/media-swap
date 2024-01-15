import { type ReCaptchaResult } from "@/ui/form/securityVerifier/type";
import { fetchResult } from "@/utils/fetcher";
import { env } from "@/utils/serverEnv";

/**
 * 認証の結果を取得する
 * @param verificationCode Security Verifireで取得した値
 * @returns 認証の結果
 */
export const fetchVerifyResult = async (verificationCode: string) => {
  const url = "https://www.google.com/recaptcha/api/siteverify";
  const result = await fetchResult<ReCaptchaResult>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret: env.GOOGLE_RECAPTCHA_SECRET_KEY,
      response: verificationCode,
    }).toString(),
  });
  if (result.isFailure) {
    return false;
  }
  return true;
};
