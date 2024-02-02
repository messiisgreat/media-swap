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
import { findTransactionWithHandling } from "@/app/(contents)/(auth)/transactions/[transactionId]/services";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { Section, TitleUnderbar } from "@/ui/structure";
import { type Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "取引ページ",
  description: "取引ページ",
};

/**
 * 取引詳細ページ
 * /transactions/[transactionId]
 */
const Page = async ({
  params: { transactionId },
}: {
  params: { transactionId: string };
}) => {
  const { transaction, sessionUser, seller, userType, statusCode } =
    await findTransactionWithHandling(transactionId);

  const isDev = process.env.NODE_ENV !== "production";

  return (
    <>
      <VerifyProvider>
        <div className="grid w-full gap-8">
          <TransactionStatus {...{ statusCode, userType }} />
          <ShippingSection {...{ transaction, userType }} />
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

export default Page;
