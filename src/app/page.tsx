import { PaginationBar } from "@/components";
import { ListingButton } from "@/components/ListingButton";
import ItemsList from "@/components/itemsList";
import {
  ListingOrderBy,
  countListings,
  findListings,
} from "@/services/listing";
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
  const orderBy: ListingOrderBy = {
    [sort]: order,
  };

  const total = await countListings();

  const totalPages = Math.ceil(total / size);

  const listings = await findListings(page, size, orderBy);
  return (
    <>
      <ItemsList listings={listings} />
      <ListingButton />
      {totalPages > 1 && (
        <PaginationBar currentPage={page} totalPages={totalPages} />
      )}
    </>
  );
}
