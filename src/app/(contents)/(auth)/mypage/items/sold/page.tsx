import { MypageItemListContainer } from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemListContainer";
import { PAGE_CONTENT, PAGE_CONTENT_ENUM_JA } from "@/constants/myPage";
import { PageTitle } from "@/ui/structure";
import { getSessionUser } from "@/utils/session";
import { type Transaction } from "@prisma/client";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    query: string;
    page: number;
    size: number;
    sort: keyof Transaction;
    order: "asc" | "desc";
  };
};

/**
 * 売却済みの商品一覧ページ
 * /mypage/items/sold
 */
const Page = async ({
  searchParams: { page = 1, size = 8, sort = "purchaseDate", order = "desc" },
}: Props) => {
  const user = await getSessionUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <>
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.SOLD]} />
      <MypageItemListContainer
        {...{
          page,
          size,
          sort,
          order,
          sellerId: user.id,
          type: "sold",
          isPublic: true,
        }}
      />
    </>
  );
};

export default Page;
