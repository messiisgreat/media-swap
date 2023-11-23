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
 *  出品商品一覧を表示するページ
 */
export default function page({
  searchParams: { page = 1, size = 27, sort = "createdAt", order = "desc" },
}: Props) {
  return (
    <>
      <ItemsListContainer page={page} size={size} sort={sort} order={order} isMyListings={true} />
    </>
  );
}
