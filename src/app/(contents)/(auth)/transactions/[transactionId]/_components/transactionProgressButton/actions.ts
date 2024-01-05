"use server";

import { updateTransaction } from "@/repositories/transaction";

/**
 * トランザクションのステータスを更新する
 * @param id トランザクションID
 * @param statusCode 取引ステータス
 */
export const updateTransactionStatus = async (
  id: string,
  statusCode: number,
) => {
  await updateTransaction({
    id,
    statusCode,
  });
};
