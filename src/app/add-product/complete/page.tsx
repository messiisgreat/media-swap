import { CompletedProduct } from "@/app/add-product/complete/CompletedProduct";
import { Metadata } from "next";

/** キャッシュしない */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "出品完了",
  description: "出品完了",
};

/**
 * 出品完了ページ
 * /add-product/complete
 * @returns page
 */
const Page = ({ searchParams }: { searchParams: { product_id: string } }) => {
  const productId = searchParams.product_id;
  return (
    <>
      <div>出品が完了しました！</div>
      <CompletedProduct productId={productId} />
    </>
  );
};

export default Page;
