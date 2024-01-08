import {
  ShippingNotification,
  TrackingNumber,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components";
import { isShippingMethodKey } from "@/constants/item";
import { type TransactionReadResult } from "@/repositories/transaction";

type ShippingSectionProps = {
  /** 取引情報 */
  transaction: TransactionReadResult;
  /** 取引者か否か */
  isSeller?: boolean;
};

/**
 * 配送情報関連の表示を行う
 */
export const ShippingSection = ({
  transaction,
  isSeller,
}: ShippingSectionProps) => {
  const { id: transactionId, trackingNumber, item } = transaction;
  const shippingMethodCode = item.shippingMethodCode;
  if (!isShippingMethodKey(shippingMethodCode)) {
    throw new Error("shippingMethodCode is not found");
  }
  return (
    <>
      {/* 送り状番号の送信用 */}
      {isSeller && <ShippingNotification transactionId={transactionId} />}
      {/* 送り状番号の表示用 */}
      <TrackingNumber
        trackingNumber={trackingNumber}
        shippingMethodCode={shippingMethodCode}
      />
    </>
  );
};
