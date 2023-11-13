"use server";

import { getTransactionComments } from "@/services/transaction";

/**
 * 取引メッセージを取得
 * @param transactionId 取引ID
 * @returns
 */
export const fetchMessages = async (transactionId: string) => {
  return await getTransactionComments(transactionId);
};
