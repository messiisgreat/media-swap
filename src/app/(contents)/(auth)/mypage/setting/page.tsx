import {
  SETTING_CONTENT,
  SETTING_CONTENT_ENUM_JA,
  SETTING_LINK,
} from "@/constants/myPage";
import { PAGE_TAB_CONTENT } from "@/app/(contents)/(auth)/mypage/types";
import { TabLinkList } from "@/app/(contents)/(auth)/mypage/_components/TabLinkList";

/**
 * 設定関連タブリンクリスト
 * @returns TabLinkList
 */
const Page = () => (
  <TabLinkList
    pages={PAGE_TAB_CONTENT}
    content={SETTING_CONTENT}
    contentEnum={SETTING_CONTENT_ENUM_JA}
    link={SETTING_LINK}
  />
);

export default Page;
