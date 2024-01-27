import { TabLinkList } from "@/app/(contents)/(auth)/mypage/_components/TabLinkList";
import { LISTING_CONTENT } from "@/constants/myPage";

const content = Object.fromEntries(
  Object.entries(LISTING_CONTENT).filter(
    ([key]) => !key.includes("IN_PROGRESS") && !key.includes("SOLD"),
  ),
);

/**
 * 商品関連タブリンクリスト
 * /mypage/items
 * @returns TabLinkList
 */
const Page = () => <TabLinkList content={content} />;

export default Page;
