"use client";

import { Transaction } from "@prisma/client";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { updateTransactionStateByTransactionId } from "@/app/transactions/[transactionId]/actions";

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
  const handleClick = () => {
    updateTransactionStateByTransactionId(transaction.id, status as number);
    router.refresh();
  };

  return (
    <>
      {!isCancel ? (
        <Button onClick={handleClick}>取引</Button>
      ) : (
        <Button onClick={handleClick}>取引キャンセル</Button>
      )}
    </>
  );
};
