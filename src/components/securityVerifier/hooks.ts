import { useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

/**
 * 認証トークンを取得する関数を提供するカスタムフック
 */
export const useVerify = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  return useCallback(async () => {
    if (!executeRecaptcha) return;
    return executeRecaptcha();
  }, [executeRecaptcha]);
};
