import { formatPrice } from "@/utils/format";
import Link from "next/link";
import { findListingById } from "../services/listing";
import PriceBadge from "./PriceBadge";

type Props = {
  /**Listing型 表示に必要なリレーション先のテーブルをインクルード済み */
  listing: Awaited<ReturnType<typeof findListingById>>;
};

/**
 * 商品カードを表示するコンポーネント
 * @param {Props} props - コンポーネントに渡されるプロパティ
 * @param {ReturnType<typeof findListingById>} props.listing - 表示に必要なリレーション先のテーブルをインクルード済みのListing型のオブジェクト
 * @returns {JSX.Element} 商品カードのJSX要素を返します。
 * @example
 * <ListingCard listing={sampleListing} />
 */
export function ListingCard({ listing }: Props) {
  const formattedPrice =
    listing.price != null ? formatPrice(listing.price) : "N/A";

  return (
    <div className="">
      <div className="relative flex items-center justify-center rounded-lg bg-gray-300">
        <Link
          href={"/listings/" + listing.id}
          className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
        >
          <div
            className="h-32 w-32 cursor-pointer rounded-lg object-cover sm:h-48 sm:w-48"
            style={{
              backgroundImage: `url(${listing.images[0].image.imageURL})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <PriceBadge className="absolute bottom-2  inline-flex h-6 w-16 items-baseline overflow-hidden whitespace-nowrap rounded-r-lg bg-black/40 pb-2 text-xs">
              {formattedPrice}
            </PriceBadge>
          </div>
        </Link>
      </div>
    </div>
  );
}
