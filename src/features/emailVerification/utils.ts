"use server";

import { createVerificationEmailContent } from "@/app/(contents)/(auth)/mypage/settings/email-verification/_components/mailTemplates";
import {
  sendMailFailed,
  sessionTimeOut,
  userNotMatch,
} from "@/constants/errorMessage";
import { sendMailToUser } from "@/lib/mail";
import { failure, success, type Result } from "@/lib/result";
import { upsertEmailVerificationCode } from "@/repositories/emailVerificationCode";
import { getSessionUser } from "@/utils/session";
import { type EmailVerificationCode } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const sentMail = "確認コードを送信しました。メールをご確認ください。";

/**
 * 認証コードを生成しユーザーに紐付ける
 * @param userId 対象ユーザーのID
 */
export const generateEmailVerificationCode = async (userId: string) => {
  const verificationCode = uuidv4();
  const expirationMinute = 30; // 有効期限30分
  const expiredAt = new Date(Date.now() + expirationMinute * 60000);
  const emailVerificationCode = await upsertEmailVerificationCode(
    userId,
    verificationCode,
    expiredAt,
  );
  return emailVerificationCode;
};

/**
 * 認証コード付きのURLをEmailで送信する
 * @param emailVerificationCode 認証コードオブジェクト
 */
export const sendEmailWithVerificationCode = async (
  emailVerificationCode: EmailVerificationCode,
): Promise<Result<string, string>> => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return failure(sessionTimeOut);
  }
  const { userId, code } = emailVerificationCode;

  if (sessionUser.id !== userId) {
    return failure(userNotMatch);
  }

  const emailContent = createVerificationEmailContent(code);
  const sendResult = await sendMailToUser(
    sessionUser.email!, // この関数が呼ばれるタイミングでemailは必ず存在する
    "メールアドレスの認証を行ってください",
    emailContent,
  );
  return sendResult ? success(sentMail) : failure(sendMailFailed);
};
