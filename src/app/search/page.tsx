import { ItemsListContainer } from "@/ui/itemsList/ItemsListContainer";
import { TitleUnderbar } from "@/ui/structure/TitleUnderbar";
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
    title: `${decodeURIComponent(query)}の検索結果`,
  };
}

/**
 * 検索ページ
 * @param param0.searchParams.query 検索クエリ
 */
export default function SearchPage({
  searchParams: {
    query,
    page = 1,
    size = 27,
    sort = "createdAt",
    order = "desc",
  },
}: SearchPageProps) {
  return (
    <>
      <TitleUnderbar title={`${query}の検索結果`} />
      <ItemsListContainer
        page={page}
        size={size}
        sort={sort}
        order={order}
        query={decodeURIComponent(query)}
      />
    </>
  );
}
