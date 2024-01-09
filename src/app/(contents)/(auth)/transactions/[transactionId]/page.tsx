import { FirstLoadContainer } from "@/app/(contents)/(auth)/transactions/[transactionId]/FirstLoadContainer";
import { Skeleton } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/skeleton";
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
  <Suspense fallback={<Skeleton />}>
    <FirstLoadContainer transactionId={transactionId} />
  </Suspense>
);

export default Page;
