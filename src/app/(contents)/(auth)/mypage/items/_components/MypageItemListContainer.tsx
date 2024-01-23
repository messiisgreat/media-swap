import { MypageItemList } from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemList";
import { MypageItemTabLink } from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemTabLink";
import {
  countItems,
  countItemsByBuyerId,
  countItemsByBuyerIdInTransaction,
  countItemsBySellerId,
  countItemsBySellerIdInTransaction,
  countItemsByUserBrowsed,
  countItemsByUserLiked,
  countSoldItemsBySellerId,
  findItems,
  findItemsByBuyerId,
  findItemsByBuyerIdInTransaction,
  findItemsBySellerId,
  findItemsBySellerIdInTransaction,
  findItemsByUserBrowsed,
  findItemsByUserLiked,
  findSoldItemsBySellerId,
  type ItemOrderBy,
  type ItemsReadResult,
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
    })
  | (CommonProps & {
      buyerId: string;
      type: "in-progress";
    })
  | (CommonProps & {
      sellerId: string;
      type: "in-progress";
    })
  | (CommonProps & {
      sellerId: string;
      type: "sold";
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
}: Props): Promise<[ItemsReadResult | ItemsReadResultByBuyerId, number]> => {
  const orderBy: ItemOrderBy =
    buyerId || (type && ["in-progress", "sold"].includes(type))
      ? {
          transaction: {
            [sort]: order,
          },
        }
      : {
          [sort]: order,
        };
  // 購入取引中の商品一覧
  if (buyerId && type === "in-progress") {
    return Promise.all([
      findItemsByBuyerIdInTransaction(buyerId, page, size, orderBy),
      countItemsByBuyerIdInTransaction(buyerId),
    ]);
  }
  // 購入商品一覧
  else if (buyerId) {
    return Promise.all([
      findItemsByBuyerId(buyerId, page, size, orderBy),
      countItemsByBuyerId(buyerId),
    ]);
    // 出品取引中商品一覧
  } else if (sellerId && isPublic && type === "in-progress") {
    return Promise.all([
      findItemsBySellerIdInTransaction(sellerId, page, size, orderBy, isPublic),
      countItemsBySellerIdInTransaction(sellerId, isPublic),
    ]);
    // 売却済み商品一覧
  } else if (sellerId && isPublic && type === "sold") {
    return Promise.all([
      findSoldItemsBySellerId(sellerId, page, size, orderBy, isPublic),
      countSoldItemsBySellerId(sellerId, isPublic),
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
      {props.sellerId && props.isPublic && <MypageItemTabLink />}
      <MypageItemList sellerId={props.sellerId} items={items} />
      {total > 1 && (
        <PaginationBar currentPage={props.page} totalPages={total} />
      )}
    </>
  );
};
