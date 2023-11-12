import { ListingCard } from "@/components/itemsList/ListingCard";
import { findListings } from "@/services/listing";

/**
 * 商品一覧を表示する
 * @param listings findListings関数で取得した商品一覧
 * @returns div
 */
export const ItemsList = ({
  listings,
}: {
  listings: Awaited<ReturnType<typeof findListings>>;
}) => (
  <div className="my-4 grid grid-cols-3 gap-1">
    {listings.map((listing) => (
      <ListingCard key={listing.id} listing={listing} />
    ))}
  </div>
);
