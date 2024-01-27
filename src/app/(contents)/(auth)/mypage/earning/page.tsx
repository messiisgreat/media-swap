import { TabLinkList } from "@/app/(contents)/(auth)/mypage/_components/TabLinkList";
import { EARNING_CONTENT } from "@/constants/myPage";

/**
 * 売上関連タブリンクリスト
 * /mypage/earning
 * @returns TabLinkList
 */
const Page = () => <TabLinkList content={EARNING_CONTENT} />;

export default Page;
