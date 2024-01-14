import { type Item } from "@prisma/client";
import { redirect } from "next/navigation";

import { ItemsListContainer } from "@/app/(contents)/(auth)/mypage/_components/ItemsListContainer";
import { PAGE_CONTENT, PAGE_CONTENT_ENUM_JA } from "@/constants/myPage";
import { PageTitle } from "@/ui/structure/PageTitle";
import { getSessionUser } from "@/utils";

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
 * /mypage/items/listings
 */
const Page = async ({
  searchParams: { page = 1, size = 8, sort = "createdAt", order = "desc" },
}: Props) => {
  const user = await getSessionUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <>
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.LISTINGS]} />
      <ItemsListContainer
        {...{ page, size, sort, order }}
        sellerId={user.id}
        isPublic
      />
    </>
  );
};

export default Page;
