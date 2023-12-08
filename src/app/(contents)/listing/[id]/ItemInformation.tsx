import { type Prisma } from "@prisma/client";
import Link from "next/link";

import { type findListingById } from "@/repositories/listing";
import { Badge } from "@/ui/Badge";

const baseClass = "my-2 w-full rounded-lg bg-white p-4 shadow-md grid gap-4";
const labelClass = "font-semibold text-gray-700";
const textClass = "text-gray-600";

type Props = {
  /** 商品クエリの結果 */
  listing: Prisma.PromiseReturnType<typeof findListingById>;
};

/**
 * 商品情報
 */
export const ItemInformation = ({ listing }: Props) => {
  return (
      <dl className={baseClass}>
        <dt className={labelClass}>商品の状態</dt>
        <dd className={textClass}>{listing.productCondition?.name}</dd>
        <dt className={labelClass}>タグ名</dt>
        <div className="flex flex-wrap gap-2">
          {listing.tags.map((tag) => (
            <dd key={tag.id}>
              <Link href={`/search?tagid=${tag.id}`}>
                <Badge className="badge-lg select-none bg-blue-100 text-blue-800">
                  {tag.tag.text}
                </Badge>
              </Link>
            </dd>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <dt className={labelClass}>配送方法</dt>
          <dd className={textClass}>{listing.shippingMethod?.name}</dd>
          <dt className={labelClass}>送料の負担について</dt>
          <dd className={textClass}>
            {listing.shippingMethod?.amount
              ? "送料別(購入者負担)"
              : "送料込み(出品者負担)"}
          </dd>
          <dt className={labelClass}>配送までの日数</dt>
          <dd className={textClass}>{listing.shippingDays?.maxDays}日以内</dd>
        </div>
      </dl>
  );
};
