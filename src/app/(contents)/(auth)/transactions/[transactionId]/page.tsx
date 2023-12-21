import {
  MessageSection,
  SellerInfo,
  ShippingNotification,
  TrackingNumber,
  TransactionProgressButton,
  TransactionStatus,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components";
import { OptionMenu } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/sellerInfo/OptionMenu";
import { transactionOptionItems } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/sellerInfo/TransactionOptionItems";
import defaultIcon from "@/images/profile-pic-placeholder.png";
import { findTransaction } from "@/repositories/transaction";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { getSessionUser } from "@/utils/session";
import { notFound } from "next/navigation";

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
    notFound();
  }
  const sellerId = transaction.item.seller.id;
  const buyerId = transaction.buyerId;

  const isSeller = sessionUser.id === sellerId;
  const isBuyer = sessionUser.id === buyerId;

  const isNotSellerOrBuyer = !isSeller && !isBuyer;

  if (isNotSellerOrBuyer) {
    notFound();
  }
  return (
    <div className="flex w-full flex-col gap-4 py-4">
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
            shippingMethodCode={transaction.item.shippingMethodCode}
          />
        )}
        {/* 通常の取引更新用ボタン */}
        <TransactionProgressButton
          transaction={transaction}
          sessionUser={sessionUser}
        />
        {/* 取引キャンセル用ボタン */}
        <TransactionProgressButton transaction={transaction} isCancel />
        <SellerInfo
          seller={transaction.item.seller}
          defaultIcon={defaultIcon}
        />
        <VerifyProvider>
          <OptionMenu
            className="absolute text-center"
            items={transactionOptionItems}
          />
        </VerifyProvider>
      </aside>
      <MessageSection transaction={transaction} sessionUser={sessionUser} />
    </div>
  );
}
