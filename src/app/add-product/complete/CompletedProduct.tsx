import { Button } from "@/components/Button";
import { findListing } from "@/services/product";
import Image from "next/image";
import Link from "next/link";

/**
 * 出品完了した商品の画像とリンク
 * @param productId 商品ID
 * @returns
 */
export const CompletedListing = async ({
  productId,
}: {
  productId: string;
}) => {
  const product = await findListing(productId);
  return (
    <Link href={"/products/" + productId} className="grid justify-center gap-4">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={400}
        className="w-40 rounded-full shadow-2xl"
      />
      <Button>商品ページへ</Button>
    </Link>
  );
};
