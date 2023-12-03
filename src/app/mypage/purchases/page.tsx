import { ItemsListContainer } from "@/components/itemsList/ItemsListContainer";
import { PageTitle } from "@/components/structure/PageTitle";
import { PAGE_CONTENT, PAGE_CONTENT_ENUM_JA } from "@/constants/myPage";
import { getSessionUser } from "@/utils/session";
import { Listing } from "@prisma/client";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    query: string;
    page: number;
    size: number;
    sort: keyof Listing;
    order: "asc" | "desc";
  };
};

/**
 *  購入商品一覧を表示するページ
 * /mypage/purchases
 */
export default async function Page({
  searchParams: { page = 1, size = 27, sort = "createdAt", order = "desc" },
}: Props) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <>
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.PURCHASES]} />
      <ItemsListContainer
        page={page}
        size={size}
        sort={sort}
        order={order}
        buyerId={user.id}
      />
    </>
  );
}
