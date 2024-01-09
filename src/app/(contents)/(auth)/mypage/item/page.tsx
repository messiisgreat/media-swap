import { TabLinkList } from "@/app/(contents)/(auth)/mypage/_components/TabLinkList";
import {
  LISTING_CONTENT,
  LISTING_CONTENT_ENUM_JA,
  LISTING_LINK,
} from "@/constants/myPage";

/**
 * 商品関連タブリンクリスト
 * @returns TabLinkList
 */
const Page = () => (
  <TabLinkList
    content={LISTING_CONTENT}
    contentEnum={LISTING_CONTENT_ENUM_JA}
    link={LISTING_LINK}
  />
);

export default Page;
