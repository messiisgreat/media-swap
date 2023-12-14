import { CompletedItem } from "@/app/(contents)/(auth)/listing/complete/CompletedListing";
import { type Metadata } from "next";

/** キャッシュしない */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "出品完了",
  description: "出品完了",
};

/**
 * 出品完了ページ
 * /listing/complete
 * @returns page
 */
const Page = ({ searchParams }: { searchParams: { item_id: string } }) => {
  const itemId = searchParams.item_id;
  return (
    <>
      <div>出品が完了しました！</div>
      <CompletedItem itemId={itemId} />
    </>
  );
};

export default Page;
