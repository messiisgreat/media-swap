import { type Item } from "@prisma/client";
import { type Metadata } from "next";

import { PublicItemListContainer } from "@/features/publicItemList/PublicItemListContainer";
import { TitleUnderbar } from "@/ui/structure/TitleUnderbar";

type SearchPageProps = {
  searchParams: {
    query: string;
    page: number;
    size: number;
    sort: keyof Item;
    order: "asc" | "desc";
  };
};

/**
 * 検索結果ページのメタデータ生成
 */
export const generateMetadata = ({
  searchParams: { query },
}: SearchPageProps): Metadata => ({
  title: `${decodeURIComponent(query)}の検索結果`,
});

/**
 * 検索ページ
 * @param param0.searchParams.query 検索クエリ
 */
const Page = ({
  searchParams: {
    query,
    page = 1,
    size = 27,
    sort = "createdAt",
    order = "desc",
  },
}: SearchPageProps) => (
  <>
    <TitleUnderbar title={`${query}の検索結果`} />
    <PublicItemListContainer
      page={page}
      size={size}
      sort={sort}
      order={order}
      query={decodeURIComponent(query)}
    />
  </>
);

export default Page;
