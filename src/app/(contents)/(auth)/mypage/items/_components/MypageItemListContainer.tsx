import { MypageItemList } from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemList";
import {
  countItems,
  countItemsByBuyerId,
  countItemsBySellerId,
  countItemsByUserBrowsed,
  countItemsByUserLiked,
  findItems,
  findItemsByBuyerId,
  findItemsBySellerId,
  findItemsByUserBrowsed,
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
    })
  | (CommonProps & {
      userId: string;
      type: "browsingHistory";
    });

const findItemsAndCount = ({
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
  const orderBy: ItemOrderBy = buyerId
    ? {
        transaction: {
          [sort]: order,
        },
      }
    : {
        [sort]: order,
      };

  // 購入商品一覧
  if (buyerId) {
    return Promise.all([
      findItemsByBuyerId(buyerId, page, size, orderBy),
      countItemsByBuyerId(buyerId),
    ]);
    // 出品商品一覧
  } else if (sellerId && isPublic) {
    return Promise.all([
      findItemsBySellerId(sellerId, page, size, orderBy),
      countItemsBySellerId(sellerId, isPublic),
    ]);
    // 下書き商品一覧
  } else if (sellerId && !isPublic) {
    return Promise.all([
      findItemsBySellerId(sellerId, page, size, orderBy, isPublic),
      countItemsBySellerId(sellerId, isPublic),
    ]);
    // いいね一覧
  } else if (userId && type === "likes") {
    return Promise.all([
      findItemsByUserLiked(userId, page, size, orderBy),
      countItemsByUserLiked(userId),
    ]);
    // 閲覧履歴
  } else if (userId && type === "browsingHistory") {
    return Promise.all([
      findItemsByUserBrowsed(userId, page, size, orderBy),
      countItemsByUserBrowsed(userId),
    ]);
    // 全商品一覧
  } else {
    return Promise.all([findItems(page, size, orderBy), countItems()]);
  }
};

/**
 * 購入商品のデータ取得が責務のコンテナ
 * @param props page, size, sort, order
 */
export const MypageItemListContainer = async (props: Props) => {
  const [items, count] = await findItemsAndCount(props);
  const total = Math.ceil(count / props.size);
  return (
    <>
      <MypageItemList items={items} />
      {total > 1 && (
        <PaginationBar currentPage={props.page} totalPages={total} />
      )}
    </>
  );
};
