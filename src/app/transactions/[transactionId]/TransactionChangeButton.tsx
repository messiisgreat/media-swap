"use client";

import { useCallback } from "react";
import { Transaction } from "@prisma/client";
import { Button } from "@/components";
import { updateTransactionStatus } from "@/services/transaction";
import { useRouter } from "next/navigation";

/**
 * 取引ステータス変更ボタンコンポーネント
 * @param children - ボタン内のコンテンツ
 * @returns
 */
export const TransactionChangeButton = ({
  transaction,
  status,
  isCancel = false,
}: {
  transaction: Transaction;
  status?: number;
  isCancel?: boolean;
}) => {
  const router = useRouter();
  const handleClick = useCallback(
    async (id: string, transactionStatus: number) => {
      await updateTransactionStatus({
        id,
        transactionStatus: Number(transactionStatus),
      });
      router.refresh();
    },
    [router],
  );
  return (
    <>
      {!isCancel ? (
        <Button onClick={() => handleClick(transaction.id, status as number)}>
          取引
        </Button>
      ) : (
        <Button onClick={() => handleClick(transaction.id, 4)}>
          取引キャンセル
        </Button>
      )}
    </>
  );
};
