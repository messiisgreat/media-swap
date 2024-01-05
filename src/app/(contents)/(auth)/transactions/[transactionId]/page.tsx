import {
  MessageSection,
  OptionMenu,
  SellerInfo,
  TransactionProgressButton,
  TransactionStatus,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components";
import { ShippingSection } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/ShippingSection";
import { findTransaction } from "@/repositories/transaction";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { getSessionUser } from "@/utils/session";
import { notFound } from "next/navigation";

/**
 * 取引画面
 * @param param0.transactionId 取引ID
 */
const Page = async ({ params }: { params: { transactionId: string } }) => {
  const transactionId = params.transactionId;
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
  return (
    <VerifyProvider>
      <div className="w-full">
        <aside className="grid gap-8">
          <TransactionStatus statusCode={statusCode} userType={userType} />
          <ShippingSection
            transactionId={transactionId}
            transaction={transaction}
            isSeller={isSeller}
          />
          <TransactionProgressButton
            transaction={transaction}
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

export default Page;
