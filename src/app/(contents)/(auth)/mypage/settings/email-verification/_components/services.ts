"use server";

import { failure, success, type Result } from "@/lib/result";
import { findEmailVerificationCode } from "@/repositories/emailVerificationCode";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

/**
 * 認証結果メッセージ
 */
const successfullyVerified = "認証が完了しました。";
const verificationCodeNotFound =
  "認証コードが見つかりませんでした。正しいユーザーでログインしているかをご確認し、再度お試しください。";
const expiredVerificationCode =
  "この認証コードは有効期限がすでに切れています。";

/**
 * 取得した認証コードとDB内の認証コードが一致しているかを確認する
 * @param code URLから取得した認証コード
 * @returns Result型
 */
export const verifyEmail = async (
  code: string | undefined,
): Promise<Result<string, string>> => {
  const sessionUser = await getSessionUser();

  // ログインしていない場合
  if (!sessionUser) {
    redirect(
      `/signin?redirect=/mypage/settings/email-verification?code=${code}`,
    );
  }

  if (!code) {
    return failure(verificationCodeNotFound);
  }

  const emailVerificationCode = await findEmailVerificationCode(code);

  // 認証コードが見つからなかった場合
  if (!emailVerificationCode) {
    return failure(verificationCodeNotFound);
  }

  const { userId, expiredAt } = emailVerificationCode;

  // 認証コードが見つかったが、ユーザーIDが一致しない場合
  if (sessionUser.id !== userId) {
    return failure(verificationCodeNotFound);
  }

  // 認証コードが期限切れの場合
  if (new Date() > expiredAt) {
    return failure(expiredVerificationCode);
  }

  // 認証成功
  return success(successfullyVerified);
};
