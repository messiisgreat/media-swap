import { TabLinkList } from "@/app/(contents)/(auth)/mypage/_components/TabLinkList";
import {
  SETTING_CONTENT,
  SETTING_CONTENT_ENUM_JA,
  SETTING_LINK,
} from "@/constants/myPage";

/**
 * 設定関連タブリンクリスト
 * @returns TabLinkList
 */
const Page = () => (
  <TabLinkList
    content={SETTING_CONTENT}
    contentEnum={SETTING_CONTENT_ENUM_JA}
    link={SETTING_LINK}
  />
);

export default Page;
