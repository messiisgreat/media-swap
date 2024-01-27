import { LISTING_TAB_CONTENT } from "@/app/(contents)/(auth)/mypage/items/(listinged)/const";
import { TabMenu } from "@/ui/tabmenu/TabMenu";

/**
 * 出品商品のページを切り替えるタブリンク
 */
export const MypageItemTabLink = () => <TabMenu pages={LISTING_TAB_CONTENT} />;
