import ItemsList from "@/features/itemsList";
import {
  countItems,
  countItemsByBuyerId,
  countItemsByProductName,
  countItemsBySellerId,
  countItemsByUserBrowsed,
  countItemsByUserLiked,
  findItems,
  findItemsByBuyerId,
  findItemsByProductName,
  findItemsBySellerId,
  findItemsByUserBrowsed,
  findItemsByUserLiked,
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
  type?: string;
};

type Props =
  | (CommonProps & {
      query?: never;
      buyerId?: never;
      sellerId?: never;
      isPublic?: never;
    })
  | (CommonProps & {
      query: string;
    })
  | (CommonProps & {
      buyerId: string;
      sellerId?: never;
    })
  | (CommonProps & {
      buyerId?: never;
      sellerId: string;
      isPublic?: boolean;
    })
  | (CommonProps & {
      userId: string;
      type: "browsing";
    })
  | (CommonProps & {
      userId: string;
      type: "likes";
    });

/**
 * 渡されたパラメータに応じて取得するデータを選択する
 * @param props page, size, sort, order, query, buyerId, sellerId, isPublic, userId
 * @returns [商品の配列, 商品数]
 */
const finditemsAndCount = async ({
  page,
  size,
  sort,
  order,
  query,
  buyerId,
  sellerId,
  isPublic,
  userId,
  type,
}: Props): Promise<[ItemsReadResult, number]> => {
  const orderBy: ItemOrderBy = {
    [sort]: order,
  };
  // 購入商品一覧
  if (buyerId) {
    return await Promise.all([
      findItemsByBuyerId(buyerId, page, size, orderBy),
      countItemsByBuyerId(buyerId),
    ]);
    // 下書き商品一覧
  } else if (sellerId && !isPublic) {
    return await Promise.all([
      findItemsBySellerId(sellerId, page, size, orderBy, isPublic),
      countItemsBySellerId(sellerId, isPublic),
    ]);
    // 出品商品一覧
  } else if (sellerId && isPublic) {
    return await Promise.all([
      findItemsBySellerId(sellerId, page, size, orderBy, isPublic),
      countItemsBySellerId(sellerId, isPublic),
    ]);
    // 閲覧履歴を取得
  } else if (userId && type === "browsing") {
    return await Promise.all([
      findItemsByUserBrowsed(userId, page, size, orderBy),
      countItemsByUserBrowsed(userId),
    ]);
    // いいね一覧
  } else if (userId && type === "likes") {
    return await Promise.all([
      findItemsByUserLiked(userId, page, size, orderBy),
      countItemsByUserLiked(userId),
    ]);
    // 検索結果
  } else if (query) {
    return await Promise.all([
      findItemsByProductName(query, page, size, orderBy),
      countItemsByProductName(query),
    ]);
    // 全商品一覧
  } else {
    return await Promise.all([findItems(page, size, orderBy), countItems()]);
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
