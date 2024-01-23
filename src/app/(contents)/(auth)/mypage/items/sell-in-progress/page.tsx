import { PAGE_CONTENT, PAGE_CONTENT_ENUM_JA } from "@/constants/myPage";

import { MypageItemListContainer } from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemListContainer";
import { PageTitle } from "@/ui/structure/PageTitle";
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
 *  出品取引中の商品一覧ページ
 *  mypage/items/sell-in-progress
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
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.SELL_IN_PROGRESS]} />
      <MypageItemListContainer
        {...{
          page,
          size,
          sort,
          order,
          sellerId: user.id,
          type: "in-progress",
          isPublic: true,
        }}
      />
    </>
  );
};

export default Page;
