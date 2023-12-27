"use client";

import { useCallback, useEffect, useState } from "react";

import { updateTransactionStatus } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/transactionProgressButton/actions";
import { TRANSACTION_STATUS } from "@/constants/item";
import { Button } from "@/ui";
import { type SessionUser } from "@/utils";
import { type Transaction } from "@prisma/client";
import { useRouter } from "next/navigation";

/**
 * 取引ステータス変更ボタンコンポーネント
 * @param {object} props - コンポーネントのプロパティ
 * @param {Transaction} props.transaction - 取引情報
 * @param {number} [props.status] - 次のステータス
 * @param {boolean} [props.isCancel] - キャンセルフラグ
 * @returns
 */
export const TransactionProgressButton = ({
  transaction,
  sessionUser,
  status,
  isCancel = false,
}: {
  transaction: Transaction;
  sessionUser?: SessionUser;
  status?: number;
  isCancel?: boolean;
}) => {
  const router = useRouter();
  const [nextStatus, setNextStatus] = useState(transaction.transactionStatus);

  useEffect(() => {
    const newStatus = isCancel
      ? TRANSACTION_STATUS.CANCELLED
      : status ?? transaction.transactionStatus + 1;
    setNextStatus(newStatus);
  }, [isCancel, status, transaction.transactionStatus]);

  const handleClick = useCallback(async () => {
    await updateTransactionStatus(transaction.id, nextStatus);
    router.refresh();
  }, [nextStatus, router, transaction.id]);

  const handleClicktoHome = useCallback(() => {
    router.push("/");
  }, [router]);

  const isVisibleButton = () => {
    const isBuyer = sessionUser?.id === transaction.buyerId;
    switch (transaction.transactionStatus) {
      case TRANSACTION_STATUS.BEFORE_PAYMENT:
        return isBuyer;
      case TRANSACTION_STATUS.COMPLETE_PAYMENT:
        return !isBuyer;
      case TRANSACTION_STATUS.SENT:
        return isBuyer;
      case TRANSACTION_STATUS.RECEIVED:
        return true;
      case TRANSACTION_STATUS.COMPLETED:
        return true;
      default:
        return false;
    }
  };

  const transactionButtonStatus = [
    "支払完了",
    "発送完了",
    "受取完了",
    "取引完了",
    "トップページへ戻る",
    "取引評価",
    "取引キャンセル",
  ];

  return !isCancel ? (
    isVisibleButton() &&
      (transaction.transactionStatus !== TRANSACTION_STATUS.COMPLETED ? (
        <Button onClick={handleClick}>
          {transactionButtonStatus[transaction.transactionStatus]}
        </Button>
      ) : (
        <Button onClick={handleClicktoHome}>ホームへ戻る</Button>
      ))
  ) : (
    <Button onClick={handleClick}>取引キャンセル</Button>
  );
};
