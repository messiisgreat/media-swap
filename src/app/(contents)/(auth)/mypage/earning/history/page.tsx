import { SalesBalanceContainer } from "@/features/salesBalance/SalesBalanceContainer";
import { SalesHistoryContainer } from "@/features/salesHistory/SalesHistoryContainer";

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
      <SalesBalanceContainer />
      <SalesHistoryContainer />
    </>
  );
};

export default Page;
