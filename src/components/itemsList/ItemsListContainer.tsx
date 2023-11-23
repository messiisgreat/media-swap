import { PaginationBar } from "@/components";
import { ListingButton } from "@/components/ListingButton";
import ItemsList from "@/components/itemsList";
import {
  ListingOrderBy,
  countListings,
  countListingsByBuyerId,
  countListingsByProductName,
  countListingsBySellerId,
  findListings,
  findListingsByBuyerId,
  findListingsByProductName,
  findListingsBySellerId,
} from "@/services/listing";

type CommonProps = {
  page: number;
  size: number;
  sort: string;
  order: string;
  query?: string;
  buyerId?: string;
  sellerId?: string;
};

type AllProps = CommonProps & {
  query?: never;
  buyerId?: never;
  sellerId?: never;
};

type SearchProps = CommonProps & {
  query: string;
  buyerId?: never;
  sellerId?: never;
};

type BuyerProps = CommonProps & {
  buyerId: string;
  sellerId?: never;
};

type SellerProps = CommonProps & {
  buyerId?: never;
  sellerId: string;
};

export type Props = SearchProps | BuyerProps | SellerProps| AllProps;

/** 
 * 渡されたパラメータに応じて取得するデータを選択する
 * @param props page, size, sort, order, query, buyerId, sellerId
 */
const findlistingsAndCount = async (props: Props) => {
  const { page, size, sort, order, query, buyerId, sellerId } = props;
  const orderBy: ListingOrderBy = {
    [sort]: order,
  };
  if (buyerId) {
    const listings = await findListingsByBuyerId(buyerId, page, size, orderBy);
    const count = await countListingsByBuyerId(buyerId);
    return [listings, count] as const;
  } else if (sellerId) {
    const listings = await findListingsBySellerId(
      sellerId,
      page,
      size,
      orderBy,
    );
    const count = await countListingsBySellerId(sellerId);
    return [listings, count] as const;
  } else if (query) {
    const listings = await findListingsByProductName(
      query,
      page,
      size,
      orderBy,
    );
    const count = await countListingsByProductName(query);
    return [listings, count] as const;
  } else {
    const listings = await findListings(page, size, orderBy);
    const count = await countListings();
    return [listings, count] as const;
  }
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
