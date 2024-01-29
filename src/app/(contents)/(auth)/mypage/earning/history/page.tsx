import { SalesBalanceContainer } from "@/app/(contents)/(auth)/mypage/earning/_components/salesBalance";
import { SalesHistoryContainer } from "@/app/(contents)/(auth)/mypage/earning/history/_components/salesHistory";

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
