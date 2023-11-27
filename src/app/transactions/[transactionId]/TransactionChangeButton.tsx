"use client";

import { useCallback } from "react";
import { Transaction } from "@prisma/client";
import { Button } from "@/components";
import { transactionStateUpdate } from "@/app/transactions/[transactionId]/actions";
import {
  TRANSACTION_STATUS,
  NEXT_TRANSACTION_STATUS,
  TRANSACTION_BUTTON_STATUS,
} from "@/constants/listing";
/**
 * 取引ステータス変更ボタンコンポーネント
 * @param children - ボタン内のコンテンツ
 * @returns
 */
export const TransactionChangeButton = ({
  transaction,
  isCancel = false,
}: {
  transaction: Transaction;
  isCancel?: boolean;
}) => {
  const handleClick = useCallback(async () => {
    const statusKey = transaction.transactionStatus as keyof typeof NEXT_TRANSACTION_STATUS;
    const nextStatus = isCancel ? TRANSACTION_STATUS.CANCELLED : NEXT_TRANSACTION_STATUS[statusKey];
    await transactionStateUpdate(transaction.id, nextStatus);
    window.location.reload();
  }, [transaction, isCancel]);

  return (
    <Button onClick={handleClick}>
      {!isCancel ? (
        TRANSACTION_BUTTON_STATUS[
          transaction.transactionStatus as keyof typeof TRANSACTION_BUTTON_STATUS
        ]
      ) : (
        <>取引キャンセル</>
      )}
    </Button>
  );
};

/**
 * テスト用：取引ステータス変更ボタンコンポーネント
 * @param children - ボタン内のコンテンツ
 * @returns
 */
export const TestTransactionChangeButton = ({
  children,
  transaction,
  status,
}: {
  children: React.ReactNode;
  transaction: Transaction;
  status: number;
}) => {
  const handleClick = useCallback(async () => {
    await transactionStateUpdate(transaction.id as string, status);
    window.location.reload();
  }, [transaction, status]);

  return <Button onClick={handleClick}>{children}</Button>;
};
