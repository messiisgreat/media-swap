import { type Prisma } from "@prisma/client";
import Link from "next/link";

import {
  CONDITION,
  SHIPPING_DAYS,
  SHIPPING_METHOD,
  isConditionKey,
  isShippingDaysKey,
  isShippingMethodKey,
} from "@/constants/item";
import { type findItemById } from "@/repositories/item";
import { Badge } from "@/ui/Badge";
import { Card } from "@/ui/card";

const labelClass = "font-semibold text-gray-700";
const textClass = "text-gray-600";

type Props = {
  /** 商品クエリの結果 */
  item: Prisma.PromiseReturnType<typeof findItemById>;
};

/**
 * 商品情報
 */
export const ItemInformation = ({ item }: Props) => {
  const {
    conditionCode,
    shippingMethodCode,
    shippingDaysCode,
    isShippingIncluded,
  } = item;

  const condition = isConditionKey(conditionCode)
    ? CONDITION[conditionCode]
    : "不明";

  const shippingMethod = isShippingMethodKey(shippingMethodCode)
    ? SHIPPING_METHOD[shippingMethodCode]
    : "不明";

  const shippingDays = isShippingDaysKey(shippingDaysCode)
    ? SHIPPING_DAYS[shippingDaysCode]
    : "不明";

  const shippingInclude = isShippingIncluded
    ? "送料込み(出品者負担)"
    : "送料別(購入者負担)";

  return (
    <Card>
      <dl className="grid w-full gap-4">
        <dt className={labelClass}>商品の状態</dt>
        <dd className={textClass}>{condition}</dd>
        <dt className={labelClass}>タグ名</dt>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((itemTag) => (
            <dd key={itemTag.id}>
              <Link href={`/search?tagid=${itemTag.id}`}>
                <Badge className="badge-lg select-none bg-blue-100 text-blue-800">
                  {itemTag.tag.text}
                </Badge>
              </Link>
            </dd>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <dt className={labelClass}>配送方法</dt>
          <dd className={textClass}>{shippingMethod}</dd>
          <dt className={labelClass}>送料の負担について</dt>
          <dd className={textClass}>{shippingInclude}</dd>
          <dt className={labelClass}>配送までの日数</dt>
          <dd className={textClass}>{shippingDays}</dd>
        </div>
      </dl>
    </Card>
  );
};
