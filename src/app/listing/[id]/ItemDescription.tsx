"use client";

import { findListingById } from "@/services/listing";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const baseClass = "my-2 w-full rounded-lg bg-white p-4 shadow-md grid gap-4";
const textClass = "text-gray-600";

type Props = {
  /** 商品クエリの結果 */
  listing: Prisma.PromiseReturnType<typeof findListingById>;
  /** 折りたたむ文字数 */
  charLimit?: number;
};

/**
 * 商品説明を表示する
 * 指定した文字数を超える場合は折りたたむ
 */
export const ItemDescription = ({ listing, charLimit = 128 }: Props) => {
  const shouldCollapseDescription = listing.description!.length > charLimit;
  const collapseClass = shouldCollapseDescription ? "truncate" : "";
  const [isCollapsed, setIsCollapsed] = useState(shouldCollapseDescription);
  const toggleDescription = () => setIsCollapsed((prev) => !prev);
  return (
    <div className={baseClass}>
      <p className={twMerge(textClass, collapseClass)}>{listing.description}</p>
      {shouldCollapseDescription && (
        <button
          className="cursor-pointer bg-blue-600 underline hover:bg-blue-700"
          onClick={toggleDescription}
        >
          {isCollapsed ? "もっと見る" : "折りたたむ"}
        </button>
      )}
    </div>
  );
};
