import { ButtonAsLink } from "@/components/Button";
import { LuBox } from "react-icons/lu";

/**
 * 商品出品ボタン
 * @returns
 */
export const ListingButton = ({ className }: { className?: string }) => {
  return (
    <ButtonAsLink
      href="/add-listing"
      title="出品する"
      className={`flex h-16 w-16 flex-col items-center justify-center 
      gap-1 rounded-full font-bold text-white ${
        className || ""
      }`}
    >
      <LuBox size={28} />
      <span className="text-xs">出品</span>
    </ButtonAsLink>
  );
};
