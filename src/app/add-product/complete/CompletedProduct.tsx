import { findProduct } from "@/app/add-product/complete/server";
import { Button } from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

/**
 * 出品完了した商品の画像とリンク
 * @param productId 商品ID
 * @returns
 */
export const CompletedProduct = async ({
  productId,
}: {
  productId: string;
}) => {
  const product = await findProduct(productId);
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
