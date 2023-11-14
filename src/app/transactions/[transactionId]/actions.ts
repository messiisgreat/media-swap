"use server";

import { createTransactionComment, getTransactionComments, markAsReadTransactionComments } from "@/services/transaction";
import { Session } from "next-auth";

/**
 * 取引メッセージを取得
 * @param transactionId 取引ID
 * @param userId ユーザーID(既読処理に使用)
 * @returns
 */
export const fetchMessages = async (transactionId: string, userId: string) => {
  const [comments] = await Promise.all([
    getTransactionComments(transactionId),
    markAsReadTransactionComments(transactionId, userId)
  ]);
  return comments;
};

/**
 * メッセージを送信
 * @param message メッセージ
 * @param sessionUser セッションユーザー
 * @param transactionId 取引ID
 * @returns
 */
export const sendMessage = async (
  message: string,
  sessionUser: Session["user"],
  transactionId: string
) => {
  if (message.length > 300)
    throw new Error("メッセージは300文字以内で入力してください");
  await createTransactionComment(message, sessionUser.id, transactionId);
}