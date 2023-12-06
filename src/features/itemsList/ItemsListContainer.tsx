import ItemsList from "@/features/itemsList";
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
} from "@/repositories/listing";
import { PaginationBar } from "@/ui";
import { ListingButton } from "@/ui/ListingButton";

type CommonProps = {
  page: number;
  size: number;
  sort: string;
  order: string;
  query?: string;
  buyerId?: string;
  sellerId?: string;
  isPublic?: boolean;
};

type AllProps = CommonProps & {
  query?: never;
  buyerId?: never;
  sellerId?: never;
  isPublic?: never;
};

type SearchProps = CommonProps & {
  query: string;
  buyerId?: never;
  sellerId?: never;
  isPublic?: never;
};

type BuyerProps = CommonProps & {
  buyerId: string;
  sellerId?: never;
  isPublic?: never;
};

type SellerProps = CommonProps & {
  buyerId?: never;
  sellerId: string;
  isPublic?: boolean;
};

export type Props = SearchProps | BuyerProps | SellerProps | AllProps;

/**
 * 渡されたパラメータに応じて取得するデータを選択する
 * @param props page, size, sort, order, query, buyerId, sellerId
 */
const findlistingsAndCount = async (props: Props) => {
  const { page, size, sort, order, query, buyerId, sellerId, isPublic } = props;
  const orderBy: ListingOrderBy = {
    [sort]: order,
  };
  // 購入商品一覧
  if (buyerId) {
    const listings = await findListingsByBuyerId(buyerId, page, size, orderBy);
    const count = await countListingsByBuyerId(buyerId);
    return [listings, count] as const;

    // 下書き商品一覧
  } else if (sellerId && !isPublic) {
    const listings = await findListingsBySellerId(
      sellerId,
      page,
      size,
      orderBy,
      isPublic,
    );
    const count = await countListingsBySellerId(sellerId, isPublic);
    return [listings, count] as const;
    // 出品商品一覧
  } else if (sellerId && isPublic) {
    const listings = await findListingsBySellerId(
      sellerId,
      page,
      size,
      orderBy,
      isPublic,
    );
    const count = await countListingsBySellerId(sellerId, isPublic);
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