import { ItemsList } from "@/app/(contents)/(auth)/mypage/_components/ItemsList";
import {
  countItems,
  countItemsByBuyerId,
  countItemsBySellerId,
  countItemsByUserLiked,
  findItems,
  findItemsByBuyerId,
  findItemsBySellerId,
  findItemsByUserLiked,
  type ItemOrderBy,
  type ItemsReadResultByBuyerId,
} from "@/repositories/item";
import { PaginationBar } from "@/ui";

type CommonProps = {
  page: number;
  size: number;
  sort: string;
  order: string;
  buyerId?: string;
  sellerId?: string;
  isPublic?: boolean;
  userId?: string;
  type?: string;
};

type Props =
  | (CommonProps & {
      buyerId?: never;
      sellerId?: never;
      isPublic?: never;
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
      type: "likes";
    });

const findItemsAndCount = async ({
  page,
  size,
  sort,
  order,
  buyerId,
  sellerId,
  isPublic,
  userId,
  type,
}: Props): Promise<[ItemsReadResultByBuyerId, number]> => {
  const orderBy: ItemOrderBy = (() => {
    if (buyerId) {
      return {
        transaction: {
          [sort]: order,
        },
      };
    } else {
      return {
        [sort]: order,
      };
    }
  })();

  // 購入商品一覧
  if (buyerId) {
    return await Promise.all([
      findItemsByBuyerId(buyerId, page, size, orderBy),
      countItemsByBuyerId(buyerId),
    ]);
    // 出品商品一覧
  } else if (sellerId && isPublic) {
    return await Promise.all([
      findItemsBySellerId(sellerId, page, size, orderBy),
      countItemsBySellerId(sellerId, isPublic),
    ]);
    // いいね一覧
  } else if (userId && type === "likes") {
    return await Promise.all([
      findItemsByUserLiked(userId, page, size, orderBy),
      countItemsByUserLiked(userId),
    ]);
    // 下書き商品一覧
  } else if (sellerId && !isPublic) {
    return await Promise.all([
      findItemsBySellerId(sellerId, page, size, orderBy),
      countItemsBySellerId(sellerId, isPublic),
    ]);
  } else {
    return await Promise.all([findItems(page, size, orderBy), countItems()]);
  }
};

/**
 * 購入商品のデータ取得が責務のコンテナ
 * @param props page, size, sort, order
 */
export const ItemsListContainer = async (props: Props) => {
  const [items, count] = await findItemsAndCount(props);
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
