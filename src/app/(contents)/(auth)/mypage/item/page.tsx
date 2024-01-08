import {
  LISTING_CONTENT,
  LISTING_CONTENT_ENUM_JA,
  LISTING_LINK,
} from "@/constants/myPage";
import { PAGE_TAB_CONTENT } from "@/app/(contents)/(auth)/mypage/types";
import { TabLinkList } from "@/app/(contents)/(auth)/mypage/_components/TabLinkList";

/**
 * 商品関連タブリンクリスト
 * @returns TabLinkList
 */
const Page = () => (
  <TabLinkList
    pages={PAGE_TAB_CONTENT}
    content={LISTING_CONTENT}
    contentEnum={LISTING_CONTENT_ENUM_JA}
    link={LISTING_LINK}
  />
);

export default Page;
