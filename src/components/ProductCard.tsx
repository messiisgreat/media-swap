import PriceBadge from "@/components/PriceBadge";
import { formatPrice } from "@/lib/format";
import { Product } from "@prisma/client";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  // 製品が作成されて7日以内
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <div className="">
      <div className="relative rounded-lg bg-gray-300 p-4 flex justify-center items-center">
        <Link href={"/products/" + product.id}>
          <div
            className="h-24 w-24 sm:h-48 sm:w-48 cursor-pointer rounded-lg object-cover"
            style={{
              backgroundImage: `url(${product.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <PriceBadge className="absolute bottom-2 left-2 rounded-lg">
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
