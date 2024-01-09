import { TabLinkList } from "@/app/(contents)/(auth)/mypage/_components/TabLinkList";
import {
  EARNING_CONTENT,
  EARNING_CONTENT_ENUM_JA,
  EARNING_LINK,
} from "@/constants/myPage";

/**
 * 売上関連タブリンクリスト
 * @returns TabLinkList
 */
const Page = () => (
  <TabLinkList
    content={EARNING_CONTENT}
    contentEnum={EARNING_CONTENT_ENUM_JA}
    link={EARNING_LINK}
  />
);

export default Page;
