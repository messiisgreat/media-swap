import { PAGE_CONTENT, PAGE_CONTENT_ENUM_JA } from "@/constants/withdrawalPage";
import { SalesBalanceContainer } from "@/features/salesBalance/SalesBalanceContainer";
import { ButtonAsLink } from "@/ui/button";
import { PageTitle } from "@/ui/structure";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

/**
 * 出金申請ページ
 * /mypage/withdrawal/request
 */
const Page = async () => {
  const user = await getSessionUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <>
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.REQUEST]} />
      <SalesBalanceContainer />
      <ButtonAsLink href="#">出金申請する</ButtonAsLink>
    </>
  );
};

export default Page;
