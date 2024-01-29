"use client";

import { updateTransactionStatus } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/transactionProgressButton/services";
import {
  TRANSACTION_STATUS,
  type TransactionStatusValue,
} from "@/constants/item";
import { Button } from "@/ui";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

/** 取引ステータスボタンの表示テキスト */
const TRANSACTION_CHANGE_BUTTON_TEXT = {
  [TRANSACTION_STATUS.BEFORE_PAYMENT]: "取引状態の初期化",
  [TRANSACTION_STATUS.COMPLETE_PAYMENT]: "支払完了",
  [TRANSACTION_STATUS.SENT]: "発送完了",
  [TRANSACTION_STATUS.RECEIVED]: "受取完了",
  [TRANSACTION_STATUS.COMPLETED]: "取引完了",
  [TRANSACTION_STATUS.CANCELLED]: "取引キャンセル",
} as const satisfies Record<TransactionStatusValue, string>;

type TransactionChangeButtonProps = {
  /** 取引ID */
  transactionId: string;
  /** 変更したいステータス */
  transactionStatus: TransactionStatusValue;
};

/**
 * 取引ステータス変更ボタンコンポーネント
 * @returns
 */
export const TransactionChangeButton = ({
  transactionId,
  transactionStatus,
}: TransactionChangeButtonProps) => {
  const router = useRouter();
  const handleClick = useCallback(async () => {
    await updateTransactionStatus(transactionId, transactionStatus);
    router.refresh();
  }, [router, transactionStatus, transactionId]);

  return (
    <Button onClick={handleClick}>
      {TRANSACTION_CHANGE_BUTTON_TEXT[transactionStatus]}
    </Button>
  );
};
