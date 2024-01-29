import { SalesBalanceContainer } from "@/app/(contents)/(auth)/mypage/earning/_components/salesBalance";
import { ButtonAsLink } from "@/ui/buttons";
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
      <SalesBalanceContainer />
      <ButtonAsLink href="#">出金申請する</ButtonAsLink>
    </>
  );
};

export default Page;
