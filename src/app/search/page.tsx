import { ListingCard } from "@/components";
import { ListingOrderBy, findListingByProductName } from "@/services/listing";
import { Metadata } from "next";
// TODO: 日本語クエリにも対応する

type SearchPageProps = {
  searchParams: {
    query: string;
    page: number;
    size: number;
    sort: string;
    order: "asc" | "desc";
  };
};

/**
 * OGP生成
 */
export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `検索結果: ${query}`,
  };
}

/**
 * 検索ページ
 * @param param0.searchParams.query 検索クエリ
 */
export default async function SearchPage({
  searchParams: {
    query,
    page = 1,
    size = 27,
    sort = "pageView",
    order = "desc",
  },
}: SearchPageProps) {
  const orderBy: ListingOrderBy = {
    [sort]: order,
  };
  const listings = await findListingByProductName(query, page, size, orderBy);
  if (listings.length === 0) {
    return <div className="text-center">商品が見つかりません</div>;
  }

  return (
    <div className="my-4 px-4 lg:px-0">
      <p className="mb-4 text-lg font-medium">検索結果</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard listing={listing} key={listing.id} />
        ))}
      </div>
    </div>
  );
}
