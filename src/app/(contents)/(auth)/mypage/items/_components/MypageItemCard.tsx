import { SoldoutBadge } from "@/features/soldoutBadge/SoldoutBadge";
import {
  type ItemsReadResult,
  type ItemsReadResultByBuyerId,
} from "@/repositories/item";
import { parseFixedDateTime } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { GoClock } from "react-icons/go";

type Props = {
  /** findItems の配列1個分 */
  item: ItemsReadResult[number] | ItemsReadResultByBuyerId[number];
};
/**
 * 購入した商品の情報を表示するコンポーネント
 * @param  item 表示に必要なリレーション先をインクルード済みのItem
 * @returns div
 */
export const MypageItemInfo = ({ item }: Props) => {
  const date = item.createdAt || item.transaction?.purchaseDate;

  const isSoldOut =
    item.transaction &&
    "id" in item.transaction &&
    Boolean(item.transaction.id);

  return (
    <div className="border-b border-gray-200 py-2">
      <Link href={`/item/${item.id}`} className="cursor-pointer">
        <div className="flex items-center">
          <div className="relative h-[calc((100vw-32px+4px*2)/5)] w-[calc((100vw-32px-4px*2)/5)] sm:size-24">
            <Image
              src={item.images[0]?.imageURL ?? ""}
              alt={item.name}
              sizes="500px"
              className="rounded"
              fill
            />
            {isSoldOut && (
              <SoldoutBadge
                className="flex size-11 rounded"
                spanClassName="p-1 text-xs"
              />
            )}
          </div>
          <div className="min-w-0 flex-1 pl-5">
            <p className="truncate">{item.name}</p>
            {date && (
              <div className="flex items-center">
                <GoClock size={18} />
                <p className="pl-1 text-xs text-gray-400">
                  {parseFixedDateTime(date)}
                </p>
              </div>
            )}
          </div>
          <FiChevronRight size={36} className="ml-auto" />
        </div>
      </Link>
    </div>
  );
};
