import { type Item } from "@prisma/client";
import { redirect } from "next/navigation";

import { MypageItemListContainer } from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemListContainer";
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
 *  下書き商品一覧を表示するページ
 * /mypage/items/drafts
 */
const Page = async ({
  searchParams: { page = 1, size = 8, sort = "createdAt", order = "desc" },
}: Props) => {
  const user = await getSessionUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <MypageItemListContainer
      {...{ page, size, sort, order, sellerId: user.id, isPublic: false }}
    />
  );
};

export default Page;
