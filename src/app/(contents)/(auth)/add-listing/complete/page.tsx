import { Metadata } from "next";

import { CompletedListing } from "@/app/(contents)/(auth)/add-listing/complete/CompletedListing";

/** キャッシュしない */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "出品完了",
  description: "出品完了",
};

/**
 * 出品完了ページ
 * /add-listing/complete
 * @returns page
 */
const Page = ({ searchParams }: { searchParams: { listing_id: string } }) => {
  const listingId = searchParams.listing_id;
  return (
    <>
      <div>出品が完了しました！</div>
      <CompletedListing listingId={listingId} />
    </>
  );
};

export default Page;
