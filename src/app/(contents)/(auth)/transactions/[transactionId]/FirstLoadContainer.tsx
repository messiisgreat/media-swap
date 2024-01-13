import {
  LoadingSpinner,
  MessageContainer,
  MessageForm,
  OptionMenu,
  SellerInfo,
  TransactionProgressButton,
  TransactionStatus,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components";
import { ShippingSection } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/ShippingSection";
import { TestTransactionContainer } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/transactionProgressButton/TestTransactionContainer";
import { isStatusCode } from "@/app/(contents)/(auth)/transactions/[transactionId]/utils";
import { findTransaction } from "@/repositories/transaction";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { Section, TitleUnderbar } from "@/ui/structure";
import { getSessionUser } from "@/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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

  const isDev = process.env.NODE_ENV !== "production";

  if (isNotSellerOrBuyer) {
    notFound();
  }
  const userType = isSeller ? "seller" : "buyer";

  if (!isStatusCode(statusCode)) {
    throw new Error("statusCode is not found");
  }
  return (
    <>
      <VerifyProvider>
        <div className="grid w-full gap-8">
          <TransactionStatus {...{ statusCode, userType }} />
          <ShippingSection {...{ transaction, isSeller }} />
          <TransactionProgressButton
            {...{ statusCode, transactionId, userType }}
          />
          <SellerInfo {...{ seller }} />
          <OptionMenu {...{ sessionUser, userType }} />
          <TitleUnderbar title="取引メッセージ" />
          <Section className="flex flex-1 flex-col gap-4">
            <Suspense fallback={<LoadingSpinner />}>
              <MessageContainer {...{ transactionId, sessionUser }} />
            </Suspense>
            <MessageForm {...{ transactionId }} />
          </Section>
        </div>
      </VerifyProvider>
      {isDev && <TestTransactionContainer {...{ transactionId }} />}
    </>
  );
};
