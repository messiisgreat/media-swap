import { notFound } from "next/navigation";
import { MessageSection } from "@/app/(contents)/(auth)/transactions/[transactionId]/MessageSection";
import { ShippingNotification } from "@/app/(contents)/(auth)/transactions/[transactionId]/ShippingNotification";
import { TrackingNumber } from "@/app/(contents)/(auth)/transactions/[transactionId]/TrackingNumber";
import { TransactionChangeButton } from "@/app/(contents)/(auth)/transactions/[transactionId]/TransactionChangeButton";
import { TransactionStatus } from "@/app/(contents)/(auth)/transactions/[transactionId]/TransactionStatus";
import defaultIcon from "@/images/profile-pic-placeholder.png";
import { findTransaction } from "@/repositories/transaction";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { getSessionUser } from "@/utils/session";
import { SellerInfo } from "@/app/(contents)/(auth)/transactions/[transactionId]/SellerInfo";

/**
 * 取引画面
 * @param param0.transactionId 取引ID
 */
export default async function Page({
  params,
}: {
  params: { transactionId: string };
}) {
  const transactionId = params.transactionId;
  const [transaction, sessionUser] = await Promise.all([
    findTransaction(transactionId),
    getSessionUser(),
  ]);

  if (!transaction || !sessionUser) {
    return notFound();
  }

  const sellerId = transaction.listing.sellerId;
  const buyerId = transaction.buyerId;

  const isSeller = sessionUser.id === sellerId;

  const isNotSellerOrBuyer =
    sessionUser.id !== sellerId && sessionUser.id !== buyerId;

  if (isNotSellerOrBuyer) {
    return notFound();
  }

  return (
    <div className="flex w-full flex-col gap-4 py-4 lg:flex-row">
      <aside className="flex flex-1 flex-col gap-8">
        <TransactionStatus
          transaction={transaction}
          sessionUser={sessionUser}
        />

        {/* 送り状番号の送信用 */}
        {isSeller && (
          <VerifyProvider>
            <ShippingNotification transactionId={transactionId} />
          </VerifyProvider>
        )}
        {/* 送り状番号の表示用 */}
        {transaction.trackingNumber && (
          <TrackingNumber
            trackingNumber={transaction.trackingNumber}
            shippingMethodId={transaction.listing.shippingMethod?.id || ""}
          />
        )}
        {/* 通常の取引更新用ボタン */}
        <TransactionChangeButton
          transaction={transaction}
          sessionUser={sessionUser}
        />
        {/* 取引キャンセル用ボタン */}
        <TransactionChangeButton transaction={transaction} isCancel />
        <SellerInfo
          seller={transaction.listing.seller}
          defaultIcon={defaultIcon}
        />
      </aside>
      <MessageSection transaction={transaction} sessionUser={sessionUser} />
    </div>
  );
}
