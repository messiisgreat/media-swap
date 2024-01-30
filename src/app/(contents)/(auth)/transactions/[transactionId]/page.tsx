import { FirstLoadContainer } from "@/app/(contents)/(auth)/transactions/[transactionId]/FirstLoadContainer";
import { TransactionSkeleton } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/transactionSkeleton";
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
const Page = ({
  params: { transactionId },
}: {
  params: { transactionId: string };
}) => (
  <Suspense fallback={<TransactionSkeleton />}>
    <FirstLoadContainer transactionId={transactionId} />
  </Suspense>
);

export default Page;
