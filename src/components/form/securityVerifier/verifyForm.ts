import { FormState } from "@/components/form";
import { fetchVerifyResult } from "@/components/form/securityVerifier/fetcher";

/**
 * 認証コードを検証する
 * @param prevState 前の状態
 * @param verificationCode 認証コード
 * @returns エラーメッセージを含んだ状態を返す。認証に成功した場合はnullを返す
 */
export const verifyForm = async <T>(
  prevState: FormState<T>,
  verificationCode: string,
): Promise<FormState<T> | null> => {
  if (!verificationCode) {
    return {
      ...prevState,
      message: "認証コードが送信されていません",
    };
  }
  const verifyResult = await fetchVerifyResult(verificationCode);
  if (!verifyResult) {
    return {
      ...prevState,
      message: "認証に失敗しました。時間を置いてお試しください。",
    };
  } else {
    return null;
  }
};
