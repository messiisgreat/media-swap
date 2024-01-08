import {
  EARNING_CONTENT,
  EARNING_CONTENT_ENUM_JA,
  EARNING_LINK,
} from "@/constants/myPage";
import { PAGE_TAB_CONTENT } from "@/app/(contents)/(auth)/mypage/types";
import { TabLinkList } from "@/app/(contents)/(auth)/mypage/_components/TabLinkList";

/**
 * 売上関連タブリンクリスト
 * @returns TabLinkList
 */
const Page = () => (
  <TabLinkList
    pages={PAGE_TAB_CONTENT}
    content={EARNING_CONTENT}
    contentEnum={EARNING_CONTENT_ENUM_JA}
    link={EARNING_LINK}
  />
);

export default Page;
