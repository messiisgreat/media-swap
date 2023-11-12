import { PaginationBar } from "@/components";
import { ListingButton } from "@/components/ListingButton";
import ItemsList from "@/components/itemsList";
import {
  ListingOrderBy,
  countListings,
  countListingsByProductName,
  findListings,
  findListingsByProductName,
} from "@/services/listing";

type Props = {
  page: number;
  size: number;
  sort: string;
  order: string;
  query?: string;
};

const findlistingsAndCount = async (props: Props) => {
  const { page, size, sort, order, query } = props;
  const orderBy: ListingOrderBy = {
    [sort]: order,
  };
  const listings = query
    ? await findListingsByProductName(query, page, size, orderBy)
    : await findListings(page, size, orderBy);
  const count = query
    ? await countListingsByProductName(query)
    : await countListings();

  return [listings, count] as const;
};

/**
 *　データ取得が責務のコンテナ
 * @param props page, size, sort, order, query
 */
export const ItemsListContainer = async (props: Props) => {
  const [listings, count] = await findlistingsAndCount(props);
  const total = Math.ceil(count / props.size);
  return (
    <>
      <ItemsList listings={listings} />
      {total > 1 && (
        <PaginationBar currentPage={props.page} totalPages={total} />
      )}
      <ListingButton className="fixed right-8 top-2 z-10 max-md:hidden" />
    </>
  );
};
