import { PurchaseSegmentSelector } from "@/app/(contents)/(auth)/mypage/items/(purchased)/PurchaseSegmentSelector";
import { type ReactNode } from "react";

/**
 * 購入商品系一覧ページのレイアウト
 */
const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <PurchaseSegmentSelector />
    {children}
  </>
);

export default Layout;
