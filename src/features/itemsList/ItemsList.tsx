import { ListingCard } from "@/features/itemsList/ListingCard";
import { type ListingsReadResult } from "@/repositories/listing";

/**
 * 商品一覧を表示する
 * @param listings findListings関数で取得した商品一覧
 * @returns div
 */
export const ItemsList = ({ listings }: { listings: ListingsReadResult }) =>
  listings.length ? (
    <div className="grid grid-cols-3 gap-1">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  ) : (
    <NoItems />
  );

const NoItems = () => (
  <div className="text-center text-gray-400">商品がありません</div>
);
