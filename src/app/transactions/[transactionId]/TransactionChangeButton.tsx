"use client";

import React, { useCallback } from "react";
import { Transaction } from "@prisma/client";
import { transactionStateUpdate } from "@/app/transactions/[transactionId]/actions";

/**
 * 取引ステータス変更ボタンコンポーネント
 * @param children - ボタン内のコンテンツ
 * @returns
 */
export const TransactionChangeButton = ({
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
  }, [transaction.id, status]);

  return (
    <button className="btn btn-primary" onChange={handleClick}>
      {children}
    </button>
  );
};
