import PriceBadge from "@/components/PriceBadge";
import { formatPrice } from "@/lib/format";
import { Product } from "@prisma/client";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

/**
 * 商品のカード
 * @param param0.product 商品
 * @returns 商品のカード
 * @example
 * <ProductCard product={sampleProduct} />
 */
export function ProductCard({ product }: ProductCardProps) {
  // 製品が作成されて7日以内
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <div className="">
      <div className="relative flex items-center justify-center rounded-lg bg-gray-300 p-2">
        <Link href={"/products/" + product.id}>
          <div
            className="h-24 w-24 cursor-pointer rounded-lg object-cover sm:h-48 sm:w-48"
            style={{
              backgroundImage: `url(${product.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <PriceBadge className="absolute bottom-2 left-4 rounded-lg pb-2 text-xs">
              {formatPrice(product.price)}
            </PriceBadge>
          </div>
        </Link>
      </div>
      <div className="mt-2">
        <h3 className="hidden text-xl font-semibold sm:block">
          {product.name}
        </h3>
      </div>
    </div>
  );
}
