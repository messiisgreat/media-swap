import { PAGE_CONTENT, PAGE_CONTENT_ENUM_JA } from "@/constants/myPage";
import { PageTitle } from "@/ui/structure";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

/**
 * 売上履歴ページ
 * /mypage/sales-history
 */
const Page = async () => {
  const user = await getSessionUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <div>
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.SALES_HISTORY]} />
    </div>
  );
};

export default Page;
