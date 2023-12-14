import ItemsList from "@/features/itemsList";
import { findBrowsingHistory } from "@/repositories/browsingHistory";
import {
  countItems,
  countItemsByBuyerId,
  countItemsByProductName,
  countItemsBySellerId,
  findItemById,
  findItems,
  findItemsByBuyerId,
  findItemsByProductName,
  findItemsBySellerId,
  type ItemOrderBy,
  type ItemsReadResult,
} from "@/repositories/item";
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
const finditemsAndCount = async (
  props: Props,
): Promise<[ItemsReadResult, number]> => {
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
  const orderBy: ItemOrderBy = {
    [sort]: order,
  };
  // 購入商品一覧
  if (buyerId) {
    const items = await findItemsByBuyerId(buyerId, page, size, orderBy);
    const count = await countItemsByBuyerId(buyerId);
    return [items, count];
    // 下書き商品一覧
  } else if (sellerId && !isPublic) {
    const items = await findItemsBySellerId(
      sellerId,
      page,
      size,
      orderBy,
      isPublic,
    );
    const count = await countItemsBySellerId(sellerId, isPublic);
    return [items, count];
    // 出品商品一覧
  } else if (sellerId && isPublic) {
    const items = await findItemsBySellerId(
      sellerId,
      page,
      size,
      orderBy,
      isPublic,
    );
    const count = await countItemsBySellerId(sellerId, isPublic);
    return [items, count];
    // 閲覧履歴を取得
  } else if (userId) {
    const browsingHistorys = await findBrowsingHistory(userId);
    const itemIds = [...new Set(browsingHistorys.map((h) => h.itemId))];
    const items = await Promise.all(
      itemIds.map(async (id) => {
        return await findItemById(id);
      }),
    );
    return [items, items.length];
  } else if (query) {
    const items = await findItemsByProductName(query, page, size, orderBy);
    const count = await countItemsByProductName(query);
    return [items, count];
    // 全商品一覧
  } else {
    const items = await findItems(page, size, orderBy);
    const count = await countItems();
    return [items, count];
  }
};

/**
 * データ取得が責務のコンテナ
 * @param props page, size, sort, order, query
 */
export const ItemsListContainer = async (props: Props) => {
  const [items, count] = await finditemsAndCount(props);
  const total = Math.ceil(count / props.size);
  return (
    <>
      <ItemsList items={items} />
      {total > 1 && (
        <PaginationBar currentPage={props.page} totalPages={total} />
      )}
    </>
  );
};
