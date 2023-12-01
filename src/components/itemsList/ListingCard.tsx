import { SoldOutBadge } from "@/components/itemsList/SoldOutBadge";
import { findListings } from "@/services/listing";
import { formatPrice } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

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
  listing: Awaited<ReturnType<typeof findListings>>[number];
};

/**
 * 商品カードを表示するコンポーネント
 * @param  listing 表示に必要なリレーション先をインクルード済みのListing
 * @returns div
 */
export function ListingCard({ listing }: Props) {
  const formattedPrice = listing.price ? formatPrice(listing.price) : "N/A";

  const isSoldOut = !!listing.transactionId;

  return (
    <div className="relative flex items-center justify-center rounded-lg bg-gray-300">
      <Link
        href={`/listing/${listing.id}`}
        className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
      >
        <div className="relative h-[calc((100vw-32px+4px*2)/3)] w-[calc((100vw-32px-4px*2)/3)] cursor-pointer sm:h-48 sm:w-48">
          <Image
            src={listing.images[0].imageURL}
            alt={listing.productName || "Product Image"}
            sizes="500px"
            fill
          />
          {isSoldOut && <SoldOutBadge />}
          <PriceBadge className="absolute bottom-2">
            {formattedPrice}
          </PriceBadge>
        </div>
      </Link>
    </div>
  );
}
