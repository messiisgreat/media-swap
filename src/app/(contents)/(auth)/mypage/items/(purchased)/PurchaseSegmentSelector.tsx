"use client";
import { LISTING_CONTENT, LISTING_LINK } from "@/constants/myPage";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

/**
 * 購入した商品一覧と取引中の商品一覧を切り替えるセグメントセレクターをチェックボックスで表示する
 */
export const PurchaseSegmentSelector = () => {
  const segment = useSelectedLayoutSegment();
  const isInProgress = segment === LISTING_CONTENT.BUY_IN_PROGRESS;
  const content = isInProgress
    ? LISTING_CONTENT.PURCHASES
    : LISTING_CONTENT.BUY_IN_PROGRESS;
  const href = LISTING_LINK[content];
  return (
    <Link href={href} className="label w-full cursor-pointer justify-start">
      <input
        type="checkbox"
        className="checkbox-info checkbox"
        checked={isInProgress}
      />
      <span className="label-text pl-2">取引中のみ表示</span>
    </Link>
  );
};
