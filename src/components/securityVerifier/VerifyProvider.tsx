"use client";

import { ReactNode } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

/**
 * セキュリティ認証情報を取得するコンポーネント
 * @example トークンの取り出し方の例
 * ```tsx
 * const { executeRecaptcha } = useGoogleReCaptcha();
 * const handleReCaptchaVerify = useCallback(async () => {
 *    if (!executeRecaptcha) return;
 *    return executeRecaptcha();
 * }, [executeRecaptcha]);
 *
 * const token = await handleReCaptchaVerify();
 * ```
 */
export const VerifyProvider = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY ?? ""}
      language="ja"
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};
