import { MypageItemTabLink } from "@/app/(contents)/(auth)/mypage/items/(listinged)/MypageItemTabLink";
import { type ReactNode } from "react";

/**
 * 出品商品系一覧ページのレイアウト
 */
const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <MypageItemTabLink />
    {children}
  </>
);

export default Layout;
