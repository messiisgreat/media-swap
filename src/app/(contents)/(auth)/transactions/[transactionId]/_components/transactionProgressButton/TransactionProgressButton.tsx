"use client";

import { TransactionChangeButton } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/transactionProgressButton/TransactionChangeButton";
import { getThisTransactionProgressStatus } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/transactionProgressButton/utils";
import { GoToHomeButton } from "@/features/GoToHomeButton";
import { type SessionUser } from "@/utils";
import { type Transaction } from "@prisma/client";

type Props = {
  /** 取引情報 */
  transaction: Transaction;
  /** セッションユーザー情報 */
  sessionUser?: SessionUser;
};

/**
 * 取引ステータス変更ボタンコンポーネント
 * @returns
 */
export const TransactionProgressButton = ({
  transaction,
  sessionUser,
}: Props) => {
  const state = getThisTransactionProgressStatus(transaction, sessionUser);

  return state.currentStatus === state.nextStatus ? (
    <GoToHomeButton />
  ) : (
    state.isVisibleButton && (
      <TransactionChangeButton
        transactionId={transaction.id}
        changeStatus={state?.nextStatus as number}
      />
    )
  );
};
