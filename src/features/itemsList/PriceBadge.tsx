import { type ReactNode } from "react";

/**
 * 商品の価格を表示するバッジ
 */
export const PriceBadge = ({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) => (
  <div
    className={`flex w-20 items-center justify-center overflow-hidden whitespace-nowrap
      rounded-r-xl bg-black/40 p-1 text-xs text-white ${className}`}
  >
    {children}
  </div>
);
