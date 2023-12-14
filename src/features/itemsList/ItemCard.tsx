import { type ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import { SoldOutBadge } from "@/features/itemsList/SoldOutBadge";
import { type ItemsReadResult } from "@/repositories/item";
import { formatPrice } from "@/utils/format";

const PriceBadge = ({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) => (
  <div
    className={`flex w-20 items-center justify-center overflow-hidden whitespace-nowrap
    rounded-r-xl bg-black/40 p-1 text-xs text-white ${className}`}
  >
    {children}
  </div>
);

type Props = {
  /** findItems の配列1個分 */
  item: ItemsReadResult[number];
};

/**
 * 商品カードを表示するコンポーネント
 * @param  item 表示に必要なリレーション先をインクルード済みのItem
 * @returns div
 */
export function ItemCard({ item }: Props) {
  const formattedPrice = item.price ? formatPrice(item.price) : "N/A";

  const isSoldOut = Boolean(item.transaction?.id);

  return (
    <div className="relative flex items-center justify-center rounded-lg bg-gray-300">
      <Link
        href={`/item/${item.id}`}
        className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
      >
        <div className="relative h-[calc((100vw-32px+4px*2)/3)] w-[calc((100vw-32px-4px*2)/3)] cursor-pointer sm:h-48 sm:w-48">
          <Image
            src={item.images[0].imageURL}
            alt={item.name || "Product Image"}
            sizes="500px"
            fill
          />
          {isSoldOut && (
            <SoldOutBadge
              className="flex h-16 w-16"
              spanClassName="p-2 text-xs"
            />
          )}
          <PriceBadge className="absolute bottom-2">
            {formattedPrice}
          </PriceBadge>
        </div>
      </Link>
    </div>
  );
}
