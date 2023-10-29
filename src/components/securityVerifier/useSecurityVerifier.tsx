"use client";

import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { z } from "zod";

/**
 * セキュリティ認証情報を取得するRenderHook
 * @returns [verifiedValue, SecurityVerifier] 認証結果, 認証用コンポーネント
 */
export const useSecurityVerifier = () => {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [verifiedValue, setVerifiedValue] = useState<string | null>(null);

  const SecurityVerifier = (
    <ReCAPTCHA
      sitekey={z
        .string()
        .nonempty()
        .parse(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY || "")}
      ref={captchaRef}
      onChange={(value) => setVerifiedValue(value)}
    />
  );

  return [verifiedValue, SecurityVerifier] as const;
};
