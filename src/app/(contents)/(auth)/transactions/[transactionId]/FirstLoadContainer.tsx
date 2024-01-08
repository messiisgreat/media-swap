import {
  MessageSection,
  OptionMenu,
  SellerInfo,
  TransactionProgressButton,
  TransactionStatus,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components";
import { ShippingSection } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/ShippingSection";
import { isStatusCode } from "@/app/(contents)/(auth)/transactions/[transactionId]/utils";
import { findTransaction } from "@/repositories/transaction";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { getSessionUser } from "@/utils";
import { notFound } from "next/navigation";

/**
 * 取引ページの初期描画に必要なデータを取得する
 */
export const FirstLoadContainer = async ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const [transaction, sessionUser] = await Promise.all([
    findTransaction(transactionId),
    getSessionUser(),
  ]);

  if (!transaction || !sessionUser) {
    notFound();
  }
  const { buyerId, statusCode } = transaction;
  const seller = transaction.item.seller;
  const sellerId = seller.id;

  const isSeller = sessionUser.id === sellerId;
  const isBuyer = sessionUser.id === buyerId;

  const isNotSellerOrBuyer = !isSeller && !isBuyer;

  if (isNotSellerOrBuyer) {
    notFound();
  }
  const userType = isSeller ? "seller" : "buyer";

  if (!isStatusCode(statusCode)) {
    throw new Error("statusCode is not found");
  }
  return (
    <VerifyProvider>
      <div className="w-full">
        <aside className="grid gap-8">
          <TransactionStatus statusCode={statusCode} userType={userType} />
          <ShippingSection transaction={transaction} isSeller={isSeller} />
          <TransactionProgressButton
            transactionId={transactionId}
            statusCode={statusCode}
            userType={userType}
          />
          <SellerInfo seller={seller} />
          <OptionMenu sessionUser={sessionUser} userType={userType} />
        </aside>
        <MessageSection transaction={transaction} sessionUser={sessionUser} />
      </div>
    </VerifyProvider>
  );
};
