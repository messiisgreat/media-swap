import { failure, success, type Result } from "@/lib/result/result";
import { fetchVerifyResult } from "@/ui/form/securityVerifier/fetcher";

const errNotSendVerificationCode = "認証コードが送信されていません";
const errFailedAtVerification =
  "認証に失敗しました。時間を置いてお試しくください";

/**
 * 認証コードを検証する
 * @param verificationCode 認証コード
 * @returns result型の認証結果 成功時はsuccess() 失敗時はfailure(エラーメッセージ)
 */
export const verifyForm = async (verificationCode: string): Promise<Result> => {
  if (!verificationCode) {
    return failure(errNotSendVerificationCode);
  }
  const isVerify = await fetchVerifyResult(verificationCode);
  if (!isVerify) {
    return failure(errFailedAtVerification);
  }
  return success();
};
