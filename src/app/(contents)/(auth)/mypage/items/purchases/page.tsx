import { type Item } from "@prisma/client";
import { redirect } from "next/navigation";

import { PAGE_CONTENT, PAGE_CONTENT_ENUM_JA } from "@/constants/myPage";
import { ItemsListContainer } from "@/features/itemsList/ItemsListContainer";
import { PageTitle } from "@/ui/structure/PageTitle";
import { getSessionUser } from "@/utils/session";

type Props = {
  searchParams: {
    query: string;
    page: number;
    size: number;
    sort: keyof Item;
    order: "asc" | "desc";
  };
};

/**
 *  購入商品一覧を表示するページ
 * /mypage/items/purchases
 */
const Page = async ({
  searchParams: { page = 1, size = 27, sort = "createdAt", order = "desc" },
}: Props) => {
  const user = await getSessionUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <>
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.PURCHASES]} />
      <ItemsListContainer {...{ page, size, sort, order }} buyerId={user.id} />
    </>
  );
};

export default Page;
