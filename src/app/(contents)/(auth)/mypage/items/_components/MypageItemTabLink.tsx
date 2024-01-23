import { LISTING_TAB_CONTENT } from "@/app/(contents)/(auth)/mypage/items/_components/const";
import { TabMenu } from "@/ui/tabmenu/TabMenu";

/**
 * 出品・購入商品一覧の表示する商品を切り替えるタブリンク
 */
export const MypageItemTabLink = () => (
  <div className="w-full">
    <TabMenu pages={LISTING_TAB_CONTENT} />
  </div>
);
