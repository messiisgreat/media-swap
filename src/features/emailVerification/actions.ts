"use server";

import { sendEmailWithVerificationCode } from "@/features/emailVerification/utils";
import { failure, type Result } from "@/lib/result";
import { generateEmailVerificationCode, getSessionUser } from "@/utils";

const couldNotFindEmailAdress =
  "送信先のEmailアドレスが見つかりませんでした。正しいユーザーでログインしているかをご確認ください。";

/**
 * 認証コードの再発行とemailの送信をする
 * @returns Result型
 */
export const createCodeAndSendEmail = async (): Promise<
  Result<string, string>
> => {
  const user = await getSessionUser();
  // ログインしていない場合
  if (!user) {
    return failure(couldNotFindEmailAdress);
  }
  const email = user?.email;
  // メールアドレスが登録されていない場合
  if (!email) {
    return failure(couldNotFindEmailAdress);
  }

  const emailVerificationCode = await generateEmailVerificationCode(user.id);
  const result = await sendEmailWithVerificationCode(emailVerificationCode);

  return result.isSuccess ? result : failure(result.error);
};
