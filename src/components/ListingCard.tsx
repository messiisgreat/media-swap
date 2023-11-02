import { findListing } from "@/services/listing";
import { formatPrice } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./Badge";

type Props = {
  /**Listing型にリレーション先の型を含めた関数の戻り値の型 */
  listing: Awaited<ReturnType<typeof findListing>>;
};

/**
 * 商品のカード
 * @param param0.listing 商品
 * @param listing 商品
 * @returns 商品のカード
 */
export function ListingCard({ listing }: Props) {
  // 製品が作成されて7日以内
  const isNew =
    Date.now() - new Date(listing.createdAt!).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link
      href={"/listings/" + listing.id}
      className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
    >
      <figure>
        <Image
          src={listing.listingImages[0].image.imageURL}
          alt={listing.productName!}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {listing.productName}
          {isNew && <Badge variant="secondary">New</Badge>}
        </h2>
        <p>{listing.description}</p>
        <Badge>{formatPrice(listing.price!)}</Badge>
      </div>
    </Link>
  );
}
