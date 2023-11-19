import PriceBadge from "@/components/PriceBadge";
import { findListingById } from "@/services/listing";
import { formatPrice } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";

type Props = {
  listing: Awaited<ReturnType<typeof findListingById>>;
};

/**
 * 商品カードを表示するコンポーネント
 * @param  listing 表示に必要なリレーション先をインクルード済みのListing
 * @returns div
 */
export function ListingCard({ listing }: Props) {
  const formattedPrice =
    listing.price != null ? formatPrice(listing.price) : "N/A";

  return (
    <div className="relative flex items-center justify-center rounded-lg bg-gray-300">
      <Link
        href={`/listing/${listing.id}`}
        className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
      >
        <div className="relative h-[calc((100vw-32px+4px*2)/3)] w-[calc((100vw-32px-4px*2)/3)] cursor-pointer rounded-lg sm:h-48 sm:w-48">
          <Image
            src={listing.images[0].imageURL}
            alt={listing.productName || "Product Image"}
            fill
            sizes="100px"
            className="rounded-lg"
          />
          <PriceBadge className="absolute bottom-2  inline-flex h-6 w-16 items-baseline overflow-hidden whitespace-nowrap rounded-r-lg bg-black/40 pb-2 text-xs">
            {formattedPrice}
          </PriceBadge>
        </div>
      </Link>
    </div>
  );
}
