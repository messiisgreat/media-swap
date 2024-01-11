import { PAGE_CONTENT, PAGE_CONTENT_ENUM_JA } from "@/constants/myPage";
import { SalesBalanceContainer } from "@/features/salesBalance/SalesBalanceContainer";
import { SalesHistoryContainer } from "@/features/salesHistory/SalesHistoryContainer";

import { PageTitle } from "@/ui/structure";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

/**
 * 売上履歴ページ
 * /mypage/earning/history
 */
const Page = async () => {
  const user = await getSessionUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <>
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.HISTORY]} />
      <SalesBalanceContainer />
      <SalesHistoryContainer />
    </>
  );
};

export default Page;
