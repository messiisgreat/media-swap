import { fetchVerifyResult } from "@/components/form/securityVerifier/fetcher";

const errNotSendVerificationCode = "認証コードが送信されていません";
const errFailedAtVerification =
  "認証に失敗しました。時間を置いてお試しくください";

/**
 * 認証コードを検証する
 * @param verificationCode 認証コード
 * @returns　認証に成功した場合はtrueを返す、失敗した場合はfalseとエラーメッセージを返す
 */
export const isVerifyForm = async (
  verificationCode: string,
): Promise<[boolean, string]> => {
  if (!verificationCode) {
    return [false, errNotSendVerificationCode];
  }
  const isVerify = await fetchVerifyResult(verificationCode);
  if (!isVerify) {
    return [false, errFailedAtVerification];
  }
  return [true, ""];
};
