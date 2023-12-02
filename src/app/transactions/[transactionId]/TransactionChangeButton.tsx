"use client";

import { useEffect, useState } from "react";
import { Transaction } from "@prisma/client";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { updateTransactionStateByTransactionId } from "@/app/transactions/[transactionId]/actions";
import {
  TRANSACTION_STATUS,
  TRANSACTION_BUTTON_STATUS,
} from "@/constants/listing";

/**
 * 取引ステータス変更ボタンコンポーネント
 * @param {object} props - コンポーネントのプロパティ
 * @param {Transaction} props.transaction - 取引情報
 * @param {number} [props.status] - 次のステータス
 * @param {boolean} [props.isCancel] - キャンセルフラグ
 * @returns
 */
export const TransactionChangeButton = ({
  transaction,
  sessionUser,
  status,
  isCancel = false,
}: {
  transaction: Transaction;
  sessionUser?: Session["user"];
  status?: number;
  isCancel?: boolean;
}) => {
  const router = useRouter();
  const [nextStatus, setNextStatus] = useState(transaction.transactionStatus);

  useEffect(() => {
    if (isCancel) {
      setNextStatus(TRANSACTION_STATUS.CANCELLED);
    } else if (status !== undefined) {
      setNextStatus(status);
    } else {
      setNextStatus(transaction.transactionStatus + 1);
    }
  }, [isCancel, status, transaction.transactionStatus]);

  const handleClick = () => {
    updateTransactionStateByTransactionId(transaction.id, nextStatus as number);
    router.refresh();
  };

  const isVisibleButton = () => {
    if (
      transaction.transactionStatus === TRANSACTION_STATUS.BEFORE_PAYMENT &&
      sessionUser?.id === transaction.buyerId
    ) {
      return true;
    }
    if (
      transaction.transactionStatus === TRANSACTION_STATUS.COMPLETE_PAYMENT &&
      sessionUser?.id !== transaction.buyerId
    ) {
      return true;
    }
    if (
      transaction.transactionStatus === TRANSACTION_STATUS.SENT &&
      sessionUser?.id === transaction.buyerId
    ) {
      return true;
    }
    if (transaction.transactionStatus === TRANSACTION_STATUS.RECEIVED) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {!isCancel ? (
        isVisibleButton() && (
          <Button onClick={handleClick}>
            {
              TRANSACTION_BUTTON_STATUS[
                transaction.transactionStatus as keyof typeof TRANSACTION_BUTTON_STATUS
              ]
            }
          </Button>
        )
      ) : (
        <Button onClick={handleClick}>取引キャンセル</Button>
      )}
    </>
  );
};
