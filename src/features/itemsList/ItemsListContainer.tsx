import ItemsList from "@/features/itemsList";
import { findBrowsingHistory } from "@/repositories/browsingHistory";
import {
  countListings,
  countListingsByBuyerId,
  countListingsByProductName,
  countListingsBySellerId,
  findListingById,
  findListings,
  findListingsByBuyerId,
  findListingsByProductName,
  findListingsBySellerId,
  type ListingOrderBy,
  type ListingsReadResult,
} from "@/repositories/listing";
import { PaginationBar } from "@/ui";

type CommonProps = {
  page: number;
  size: number;
  sort: string;
  order: string;
  query?: string;
  buyerId?: string;
  sellerId?: string;
  isPublic?: boolean;
  userId?: string;
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

type BrowsingProps = CommonProps & {
  userId: string;
};

export type Props =
  | AllProps
  | SearchProps
  | BuyerProps
  | SellerProps
  | BrowsingProps;

/**
 * 渡されたパラメータに応じて取得するデータを選択する
 * @param props page, size, sort, order, query, buyerId, sellerId, isPublic, userId
 */
const findlistingsAndCount = async (
  props: Props,
): Promise<[ListingsReadResult, number]> => {
  const {
    page,
    size,
    sort,
    order,
    query,
    buyerId,
    sellerId,
    isPublic,
    userId,
  } = props;
  const orderBy: ListingOrderBy = {
    [sort]: order,
  };
  // 購入商品一覧
  if (buyerId) {
    const listings = await findListingsByBuyerId(buyerId, page, size, orderBy);
    const count = await countListingsByBuyerId(buyerId);
    return [listings, count];
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
    return [listings, count];
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
    return [listings, count];
    // 閲覧履歴を取得
  } else if (userId) {
    const browsingHistorys = await findBrowsingHistory(userId);
    const listingIds = [...new Set(browsingHistorys.map((h) => h.listingId))];
    const listings = await Promise.all(
      listingIds.map(async (id) => {
        return await findListingById(id);
      }),
    );
    return [listings, listings.length];
  } else if (query) {
    const listings = await findListingsByProductName(
      query,
      page,
      size,
      orderBy,
    );
    const count = await countListingsByProductName(query);
    return [listings, count];
    // 全商品一覧
  } else {
    const listings = await findListings(page, size, orderBy);
    const count = await countListings();
    return [listings, count];
  }
};

/**
 * データ取得が責務のコンテナ
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
    </>
  );
};
