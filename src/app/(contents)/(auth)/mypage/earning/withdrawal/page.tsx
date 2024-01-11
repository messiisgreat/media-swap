import { PAGE_CONTENT, PAGE_CONTENT_ENUM_JA } from "@/constants/myPage";
import { SalesBalanceContainer } from "@/features/salesBalance/SalesBalanceContainer";
import { ButtonAsLink } from "@/ui/button";
import { PageTitle } from "@/ui/structure";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

/**
 * 出金申請ページ
 * /mypage/earning/withdrawal
 */
const Page = async () => {
  const user = await getSessionUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <>
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.WITHDRAWAL]} />
      <SalesBalanceContainer />
      <ButtonAsLink href="#">出金申請する</ButtonAsLink>
    </>
  );
};

export default Page;
