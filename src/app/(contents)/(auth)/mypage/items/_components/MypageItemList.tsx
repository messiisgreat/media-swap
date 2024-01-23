import { MypageItemInfo } from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemCard";
import { type ItemsReadResultByBuyerId } from "@/repositories/item";
/**
 * 購入商品一覧を表示する
 * @param items findPurchaseItemsAndCount関数で取得した商品一覧
 * @returns div
 */
export const MypageItemList = ({
  items,
  sellerId,
}: {
  items: ItemsReadResultByBuyerId;
  sellerId: string | undefined;
}) => {
  const className = sellerId || "border-t border-gray-200";
  return items.length ? (
    <div className={`w-full ${className}`}>
      {items.map((item) => (
        <MypageItemInfo key={item.id} item={item} />
      ))}
    </div>
  ) : (
    <NoItems />
  );
};

const NoItems = () => (
  <div className="text-center text-gray-400">商品がありません</div>
);
