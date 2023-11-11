import ItemsList from "@/components/itemsList";
import { TitleUnderbar } from "@/components/structure/TitleUnderbar";
import { ListingOrderBy, findListingByProductName } from "@/services/listing";
import { Listing } from "@prisma/client";
import { Metadata } from "next";

type SearchPageProps = {
  searchParams: {
    query: string;
    page: number;
    size: number;
    sort: keyof Listing;
    order: "asc" | "desc";
  };
};

/**
 * 検索結果ページのメタデータ生成
 */
export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `${query}の検索結果`,
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
    sort = "createdAt",
    order = "desc",
  },
}: SearchPageProps) {
  const orderBy: ListingOrderBy = {
    [sort]: order,
  };
  const listings = await findListingByProductName(
    decodeURIComponent(query),
    page,
    size,
    orderBy,
  );
  if (listings.length === 0) {
    return <div className="text-center">商品が見つかりません</div>;
  }
  return (
    <>
      <TitleUnderbar title={`${query}の検索結果`} />
      <ItemsList listings={listings} />
    </>
  );
}
