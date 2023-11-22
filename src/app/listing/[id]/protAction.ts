"use server";
import { updateTransaction } from "@/services/transaction";

/**
 * プロトタイプのトランザクションの状態を更新するための関数です。
 * この関数を使用して、特定のリストIDに関連するトランザクションの状態を更新します。
 * 
 * @param id トランザクションのリストID
 * @param stateId 新しいトランザクションの状態ID
 * @returns Promise<void>
 */
export const protTransactionStateUpdate = async (
  id : string,
  stateId: number
) => {
  await updateTransaction( {
      id: id,
      transactionStatus: stateId
    })
};