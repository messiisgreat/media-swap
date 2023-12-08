import { type Listing } from "@prisma/client";

import { ItemsListContainer } from "@/features/itemsList/ItemsListContainer";

type Props = {
  searchParams: {
    query: string;
    page: number;
    size: number;
    sort: keyof Listing;
    order: "asc" | "desc";
  };
};

/**
 * TOPページ
 * @param param0.searchParams.page ページ番号
 */
export default function Home({
  searchParams: { page = 1, size = 27, sort = "createdAt", order = "desc" },
}: Props) {
  return (
      <ItemsListContainer page={page} size={size} sort={sort} order={order} />
  );
}
