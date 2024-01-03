"use client";

import { updateTransactionStatus } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/transactionProgressButton/actions";
import { TRANSACTION_CHANGE_BUTTON_TEXT } from "@/constants/item";
import { Button } from "@/ui";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type TransactionChangeButtonProps = {
  /** 取引ID */
  transactionId: string;
  /** 変更したいステータス */
  changeStatus: number;
};

/**
 * 取引ステータス変更ボタンコンポーネント
 * @param {object} props - コンポーネントのプロパティ
 * @returns
 */
export const TransactionChangeButton = ({
  transactionId,
  changeStatus,
}: TransactionChangeButtonProps) => {
  const router = useRouter();
  const handleClick = useCallback(async () => {
    await updateTransactionStatus(transactionId, changeStatus);
    router.refresh();
  }, [router, changeStatus, transactionId]);

  return (
    <Button onClick={handleClick}>
      {TRANSACTION_CHANGE_BUTTON_TEXT[changeStatus as keyof typeof TRANSACTION_CHANGE_BUTTON_TEXT]}
    </Button>
  );
};
