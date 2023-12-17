"use client";

import { useDescriptionHeight } from "@/app/(contents)/item/[id]/_components/itemDescription/hooks";
import { Card } from "@/ui/card/Card";
import { useCallback, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  /** 商品の説明文 */
  description: string | null;
};

/**
 * 商品説明を表示する
 * 要素が160pxを超える場合は折りたたむ
 */
export const ItemDescription = ({ description }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const height = useDescriptionHeight(ref);
  const shouldCollapseDescription = height > 160;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapseClass = isCollapsed ? "line-clamp-6" : "";

  const handleToggleDescription = useCallback(() => {
    setIsCollapsed((prev) => !prev);
    if (!isCollapsed) {
      const element = ref.current;
      element && element.scrollIntoView();
    }
  }, [isCollapsed]);

  return (
    <Card
      ref={ref}
      className={twMerge("grid w-full gap-4", isCollapsed && "max-h-56")}
    >
      <p
        className={twMerge("text-gray-600 whitespace-pre-wrap", collapseClass)}
      >
        {description || "説明がありません。"}
      </p>
      {shouldCollapseDescription && (
        <button
          className="cursor-pointer text-right text-blue-600 underline hover:text-blue-700"
          onClick={handleToggleDescription}
        >
          {isCollapsed ? "もっと見る" : "折りたたむ"}
        </button>
      )}
    </Card>
  );
};
