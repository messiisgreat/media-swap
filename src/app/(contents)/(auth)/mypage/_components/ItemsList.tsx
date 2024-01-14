import { ItemInfo } from "@/app/(contents)/(auth)/mypage/_components/ItemInfo";
import { type ItemsReadResultByBuyerId } from "@/repositories/item";
/**
 * 購入商品一覧を表示する
 * @param items findPurchaseItemsAndCount関数で取得した商品一覧
 * @returns div
 */
export const ItemsList = ({ items }: { items: ItemsReadResultByBuyerId }) =>
  items.length ? (
    <div className="w-full border-t border-gray-200">
      {items.map((item) => (
        <ItemInfo key={item.id} item={item} />
      ))}
    </div>
  ) : (
    <NoItems />
  );

const NoItems = () => (
  <div className="text-center text-gray-400">商品がありません</div>
);
