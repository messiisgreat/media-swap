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
 *  出品商品一覧を表示するページ
 * /mypage/items/likes
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
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.LIKES]} />
      <ItemsListContainer
        {...{ page, size, sort, order }}
        userId={user.id}
        type="likes"
      />
    </>
  );
};

export default Page;
