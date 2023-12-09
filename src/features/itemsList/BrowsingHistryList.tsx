import { ListingCard } from "@/features/itemsList/ListingCard";
import { type ListingsReadResult } from "@/repositories/listing";

/**
 * 閲覧履歴一覧を表示する
 * @param listings findListings関数で取得した閲覧履歴一覧
 * @returns div
 */
export const BrowsingHistoryList = ({
  listings,
}: {
  listings: ListingsReadResult;
}) => {
  if (listings.length) {
    return (
      <div className="grid grid-cols-3 gap-1">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    );
  } else {
    return <NoItems />;
  }
};

const NoItems = () => (
  <div className="text-center text-gray-400">商品がありません</div>
);
