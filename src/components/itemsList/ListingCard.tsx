import PriceBadge from "@/components/PriceBadge";
import { findListingById } from "@/services/listing";
import { formatPrice } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import { env } from "@/utils/env";

function transformCloudinaryURL(url: string, width: number, height: number, backgroundColor: string): string {
  const baseUrl = `https://res.cloudinary.com/${env.CLOUDINARY_CLOUDNAME}/image/upload/`;
  const transformation = `c_pad,b_rgb:${backgroundColor},w_${width},h_${height}`;
  const imagePath = url.split(baseUrl)[1];

  return `${baseUrl}${transformation}/${imagePath}`;
}

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
        <div className="relative h-32 w-32 cursor-pointer rounded-lg sm:h-48 sm:w-48">
          <Image
            src={transformCloudinaryURL(listing.images[0].imageURL, 500, 500, '031e2b')}
            alt={listing.productName || "Product Image"}
            layout="fill"
            objectFit="cover"
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
