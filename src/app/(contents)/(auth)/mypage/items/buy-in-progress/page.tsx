import { PAGE_CONTENT, PAGE_CONTENT_ENUM_JA } from "@/constants/myPage";

import { MypageItemListContainer } from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemListContainer";
import { MypageItemWrapper } from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemWrapper";
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
 *  購入取引中の商品一覧ページ
 *  mypage/items/buy-in-progress
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
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.BUY_IN_PROGRESS]} />
      <MypageItemWrapper>
        <MypageItemListContainer
          {...{
            page,
            size,
            sort,
            order,
            buyerId: user.id,
            type: "in-progress",
          }}
        />
      </MypageItemWrapper>
    </>
  );
};

export default Page;
