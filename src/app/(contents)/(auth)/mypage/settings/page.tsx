import { TabLinkList } from "@/app/(contents)/(auth)/mypage/_components/TabLinkList";
import { SETTING_CONTENT } from "@/constants/myPage";

/**
 * 設定関連タブリンクリスト
 * @returns TabLinkList
 */
const Page = () => <TabLinkList content={SETTING_CONTENT} />;

export default Page;
