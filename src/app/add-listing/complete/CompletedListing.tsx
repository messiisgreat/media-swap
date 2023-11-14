import { Button } from "@/components/Button";
import { findListingById } from "@/services/listing";
import Image from "next/image";
import Link from "next/link";

/**
 * 出品完了した商品の画像とリンク
 * @param listingId 商品ID
 * @returns
 */
export const CompletedListing = async ({
  listingId,
}: {
  listingId: string;
}) => {
  const listing = await findListingById(listingId);
  return (
    <Link
      href={`/listing/${encodeURIComponent(listingId)}`}
      className="grid justify-center gap-4"
    >
      <Image
        src={listing.images[0].imageURL}
        alt={listing.productName!}
        width={400}
        height={400}
        className="w-40 rounded-full shadow-2xl"
      />
      <Button>商品ページへ</Button>
    </Link>
  );
};
