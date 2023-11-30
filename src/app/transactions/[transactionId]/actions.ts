"use server";

import {
  createTransactionComment,
  getTransactionComments,
  markAsReadTransactionComments,
  updateTransactionStatus,
} from "@/services/transaction";
import { getSessionUser } from "@/utils";

/**
 * 取引メッセージを取得
 * @param transactionId 取引ID
 * @returns
 */
export const fetchMessages = async (transactionId: string) => {
  const user = await getSessionUser();
  if (!user) throw new Error("ログインしてください");
  const userId = user.id;
  const [comments] = await Promise.all([
    getTransactionComments(transactionId),
    markAsReadTransactionComments(transactionId, userId),
  ]);
  return comments;
};

/**
 * トランザクションのステータスを更新する
 *
 * @param id - トランザクションの取引ID
 * @param stateId - 設定する新しい状態ID
 */
export const updateTransactionStateByTransactionId = async (
  id: string,
  stateId: number,
) => {
  await updateTransactionStatus({
    id,
    transactionStatus: stateId,
  });
};
/**
 * メッセージを送信
 * @param message メッセージ
 * @param transactionId 取引ID
 * @returns
 */
export const sendMessage = async (message: string, transactionId: string) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) throw new Error("ログインしてください");
  if (message.length > 300)
    throw new Error("メッセージは300文字以内で入力してください");
  await createTransactionComment(message, sessionUser.id, transactionId);
};
