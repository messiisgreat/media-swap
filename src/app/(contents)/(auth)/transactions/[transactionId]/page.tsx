import { MessageSection } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components";
import { PersonSection } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/PersonSection";
import { ShippingSection } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/ShippingSection";
import { TransactionSection } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/TransactionSection";
import defaultIcon from "@/images/profile-pic-placeholder.png";
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
  const seller = transaction.item.seller;
  const sellerId = seller.id;
  const buyerId = transaction.buyerId;

  const isSeller = sessionUser.id === sellerId;
  const isBuyer = sessionUser.id === buyerId;

  const isNotSellerOrBuyer = !isSeller && !isBuyer;

  if (isNotSellerOrBuyer) {
    notFound();
  }
  return (
    <div className="flex w-full flex-col gap-4 py-4">
      <VerifyProvider>
        <aside className="flex flex-1 flex-col gap-8">
          <TransactionSection
            transaction={transaction}
            sessionUser={sessionUser}
          >
            <ShippingSection
              transactionId={transactionId}
              transaction={transaction}
              isSeller={isSeller}
            />
          </TransactionSection>
          <PersonSection
            seller={seller}
            defaultIcon={defaultIcon}
            sessionUser={sessionUser}
            isBuyer={isBuyer}
          />
        </aside>
        <MessageSection transaction={transaction} sessionUser={sessionUser} />
      </VerifyProvider>
    </div>
  );
};

export default Page;
