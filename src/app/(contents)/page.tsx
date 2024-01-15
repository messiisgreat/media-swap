import { type Item } from "@prisma/client";

import { PublicItemListContainer } from "@/features/publicItemList/PublicItemListContainer";

type Props = {
  searchParams: {
    query: string;
    page: number;
    size: number;
    sort: keyof Item;
    order: "asc" | "desc";
  };
};

/**
 * TOPページ
 * @param param0.searchParams.page ページ番号
 */
const Page = ({
  searchParams: { page = 1, size = 27, sort = "createdAt", order = "desc" },
}: Props) => (
  <PublicItemListContainer page={page} size={size} sort={sort} order={order} />
);

export default Page;
