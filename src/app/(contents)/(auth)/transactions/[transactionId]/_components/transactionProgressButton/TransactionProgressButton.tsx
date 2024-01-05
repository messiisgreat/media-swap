import { TransactionChangeButton } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/transactionProgressButton/TransactionChangeButton";
import { getThisTransactionProgressStatus } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/transactionProgressButton/utils";
import { GoToHomeButton } from "@/features/GoToHomeButton";
import { type Transaction } from "@prisma/client";

type Props = {
  /** 取引情報 */
  transaction: Transaction;
  /** ユーザー種別 */
  userType: "seller" | "buyer";
};

/**
 * 取引ステータス変更ボタンコンポーネント
 * @returns
 */
export const TransactionProgressButton = ({ transaction, userType }: Props) => {
  const state = getThisTransactionProgressStatus(
    transaction.statusCode,
    userType,
  );

  return state.currentStatus === state.nextStatus ? (
    <GoToHomeButton />
  ) : state.isVisibleButton ? (
    <TransactionChangeButton
      transactionId={transaction.id}
      changeStatus={state.nextStatus}
    />
  ) : null;
};
