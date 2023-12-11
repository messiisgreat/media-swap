import Image from "next/image";
import { notFound } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";

import { MessageSection } from "@/app/(contents)/(auth)/transactions/[transactionId]/MessageSection";
import { ShippingNotification } from "@/app/(contents)/(auth)/transactions/[transactionId]/ShippingNotification";
import { TrackingNumber } from "@/app/(contents)/(auth)/transactions/[transactionId]/TrackingNumber";
import { TransactionChangeButton } from "@/app/(contents)/(auth)/transactions/[transactionId]/TransactionChangeButton";
import { TransactionStatus } from "@/app/(contents)/(auth)/transactions/[transactionId]/TransactionStatus";
import defaultIcon from "@/images/profile-pic-placeholder.png";
import { findTransaction } from "@/repositories/transaction";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { getSessionUser } from "@/utils/session";

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
        <div>
          <p>出品者情報</p>
          {/* TODO: 出品者情報へのリンクもしくはモーダルを追加 */}
          <div className="btn btn-ghost flex h-20 items-center justify-between px-0 normal-case">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <Image
                    src={transaction.listing.seller.image || defaultIcon}
                    width={64}
                    height={64}
                    alt=""
                  />
                </div>
              </div>
              <span className="text-xl">{transaction.listing.seller.name}</span>
            </div>
            <FaChevronRight />
          </div>
        </div>
      </aside>
      <MessageSection transaction={transaction} sessionUser={sessionUser} />
    </div>
  );
}
