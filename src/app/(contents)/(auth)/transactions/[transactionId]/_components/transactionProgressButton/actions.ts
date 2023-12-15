"use server";

import { updateTransaction } from "@/repositories/transaction";

/**
 * トランザクションのステータスを更新する
 * @param id トランザクションID
 * @param transactionStatus トランザクションステータス
 */
export const updateTransactionStatus = async (
  id: string,
  transactionStatus: number,
) => {
  await updateTransaction({
    id,
    transactionStatus,
  });
};
