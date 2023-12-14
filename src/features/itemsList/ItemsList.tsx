import { ItemCard } from "@/features/itemsList/ItemCard";
import { type ItemsReadResult } from "@/repositories/item";

/**
 * 商品一覧を表示する
 * @param items findItems関数で取得した商品一覧
 * @returns div
 */
export const ItemsList = ({ items }: { items: ItemsReadResult }) =>
  items.length ? (
    <div className="grid grid-cols-3 gap-1">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  ) : (
    <NoItems />
  );

const NoItems = () => (
  <div className="text-center text-gray-400">商品がありません</div>
);
