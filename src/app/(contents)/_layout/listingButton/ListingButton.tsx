import { LuBox } from "react-icons/lu";

import { ButtonAsLink } from "@/ui/buttons";
import { twMerge } from "tailwind-merge";

/**
 * 商品出品ボタン
 * @returns
 */
export const ListingButton = ({ className }: { className?: string }) => {
  const buttonClass =
    "flex h-16 w-16 flex-col items-center justify-center gap-1 font-bold text-dark-bg-wh";
  return (
    <ButtonAsLink
      href="/listing"
      title="出品する"
      className={twMerge(buttonClass, className)}
      rounded
    >
      <LuBox size={28} />
      <span className="text-xs">出品</span>
    </ButtonAsLink>
  );
};
