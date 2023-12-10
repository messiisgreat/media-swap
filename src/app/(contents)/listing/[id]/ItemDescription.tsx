"use client";

import { useState } from "react";

import { twMerge } from "tailwind-merge";

const baseClass = "my-2 w-full rounded-lg bg-white p-4 shadow-md grid gap-4";
const textClass = "text-gray-600 whitespace-pre";
type Props = {
  /** 商品クエリの結果 */
  description: string | null;
  /** 折りたたむ文字数 */
  charLimit?: number;
};

/**
 * 商品説明を表示する
 * 指定した文字数を超える場合は折りたたむ
 */
export const ItemDescription = ({ description, charLimit = 128 }: Props) => {
  const shouldCollapseDescription = (description?.length || 0) > charLimit;
  const collapseClass = shouldCollapseDescription ? "truncate" : "";
  const [isCollapsed, setIsCollapsed] = useState(shouldCollapseDescription);
  const handleToggleDescription = () => setIsCollapsed((prev) => !prev);

  return (
    <div className={baseClass}>
      <p className={twMerge(textClass, collapseClass)}>
        {description ?? "説明がありません。"}
      </p>
      {shouldCollapseDescription && (
        <button
          className="cursor-pointer bg-blue-600 underline hover:bg-blue-700"
          onClick={handleToggleDescription}
        >
          {isCollapsed ? "もっと見る" : "折りたたむ"}
        </button>
      )}
    </div>
  );
};
