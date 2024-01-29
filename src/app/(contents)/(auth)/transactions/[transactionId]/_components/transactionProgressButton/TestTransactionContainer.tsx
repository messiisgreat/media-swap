import { TransactionChangeButton } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/transactionProgressButton/TransactionChangeButton";
import { TRANSACTION_STATUS } from "@/constants/item";

type TestTransactionContainerProps = {
  /** 取引ID */
  transactionId: string;
};

/**
 * 取引画面テスト用ボタンコンポーネント
 */
export const TestTransactionContainer = ({
  transactionId,
}: TestTransactionContainerProps) => (
  <div>
    <div className="mb-2">試験用</div>
    <div className="flex flex-wrap gap-2">
      {/** 支払い前 */}
      <TransactionChangeButton
        transactionId={transactionId}
        transactionStatus={TRANSACTION_STATUS.BEFORE_PAYMENT}
      />
      {/** 支払い完了 */}
      <TransactionChangeButton
        transactionId={transactionId}
        transactionStatus={TRANSACTION_STATUS.COMPLETE_PAYMENT}
      />
      {/** 発送済み */}
      <TransactionChangeButton
        transactionId={transactionId}
        transactionStatus={TRANSACTION_STATUS.SENT}
      />
      {/** 受け取り完了 */}
      <TransactionChangeButton
        transactionId={transactionId}
        transactionStatus={TRANSACTION_STATUS.RECEIVED}
      />
      {/** 取引完了 */}
      <TransactionChangeButton
        transactionId={transactionId}
        transactionStatus={TRANSACTION_STATUS.COMPLETED}
      />
      {/** 取引キャンセル */}
      <TransactionChangeButton
        transactionId={transactionId}
        transactionStatus={TRANSACTION_STATUS.CANCELLED}
      />
    </div>
  </div>
);
