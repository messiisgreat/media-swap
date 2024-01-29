import { TransactionChangeButton } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/transactionProgressButton/TransactionChangeButton";
import { getThisTransactionProgressStatus } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/transactionProgressButton/utils";
import { type TransactionStatusValue } from "@/constants/item";
import { GoToHomeButton } from "@/features/GoToHomeButton";

type Props = {
  /** 取引ID */
  transactionId: string;
  /** 取引ステータス */
  statusCode: TransactionStatusValue;
  /** ユーザー種別 */
  userType: "seller" | "buyer";
};

/**
 * 取引ステータス変更ボタンコンポーネント
 * @returns
 */
export const TransactionProgressButton = ({
  transactionId,
  statusCode,
  userType,
}: Props) => {
  const { currentStatus, isVisibleButton, nextStatus } =
    getThisTransactionProgressStatus(statusCode, userType);

  return currentStatus === nextStatus ? (
    <GoToHomeButton />
  ) : isVisibleButton ? (
    <TransactionChangeButton
      transactionId={transactionId}
      transactionStatus={nextStatus}
    />
  ) : null;
};
