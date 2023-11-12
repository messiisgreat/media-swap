import { ItemsListContainer } from "@/components/itemsList/ItemsListContainer";
import { Listing } from "@prisma/client";

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
export default async function Home({
  searchParams: { page = 1, size = 27, sort = "createdAt", order = "desc" },
}: Props) {
  return (
    <>
      <ItemsListContainer page={page} size={size} sort={sort} order={order} />
    </>
  );
}
