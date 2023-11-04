import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { formatPrice } from "../utils/format";
import PriceBadge from "./PriceBadge";

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
  return (
    <div className="">
      <div className="relative flex items-center justify-center rounded-lg bg-gray-300">
        <Link href={"/products/" + product.id}>
          <div
            className="h-32 w-32 cursor-pointer rounded-lg object-cover sm:h-48 sm:w-48"
            style={{
              backgroundImage: `url(${product.imageUrl})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <PriceBadge className="absolute bottom-2  rounded-r-lg pb-2 text-xs w-16 h-6 bg-black bg-opacity-40 inline-flex items-baseline overflow-hidden whitespace-nowrap">
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
