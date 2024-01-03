import {
  ShippingNotification,
  TrackingNumber,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components";
import { type TransactionReadResult } from "@/repositories/transaction";

type ShippingSectionProps = {
  /** 取引ID */
  transactionId: string;
  /** 取引情報 */
  transaction: TransactionReadResult;
  /** 取引者か否か */
  isSeller?: boolean;
};

/**
 * 配送情報
 */
export const ShippingSection = ({
  transactionId,
  transaction,
  isSeller,
}: ShippingSectionProps) => (
  <>
    {/* 送り状番号の送信用 */}
    {isSeller && <ShippingNotification transactionId={transactionId} />}
    {/* 送り状番号の表示用 */}
    {transaction?.trackingNumber && (
      <TrackingNumber
        trackingNumber={transaction.trackingNumber}
        shippingMethodCode={transaction.item.shippingMethodCode}
      />
    )}
  </>
);
