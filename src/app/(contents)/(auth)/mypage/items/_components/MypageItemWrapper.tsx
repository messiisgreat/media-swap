"use client";
import { LISTING_CONTENT, LISTING_LINK } from "@/constants/myPage";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * 購入取引中のみ表示するためのチェックボックスでコンテナコンポーネントをラップする
 */
export const MypageItemWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathName = usePathname();
  const isInProgress = pathName.includes("buy-in-progress");
  // 取引中のみの時は遷移先を購入一覧に、購入一覧の時は取引中のみに遷移できるようにする
  const href = isInProgress
    ? LISTING_LINK[LISTING_CONTENT.PURCHASES]
    : LISTING_LINK[LISTING_CONTENT.BUY_IN_PROGRESS];
  return (
    <div className="w-full">
      <Link href={href} className="label cursor-pointer justify-start">
        <input
          type="checkbox"
          className="checkbox-accent checkbox"
          checked={isInProgress}
        />
        <span className="label-text pl-2">取引中のみ表示</span>
      </Link>
      {children}
    </div>
  );
};
