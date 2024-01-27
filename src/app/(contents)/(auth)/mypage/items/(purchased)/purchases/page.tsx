import { MypageItemListContainer } from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemListContainer";
import { type Transaction } from "@prisma/client";
import { redirect } from "next/navigation";

import { getSessionUser } from "@/utils/session";

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
 *  購入商品一覧を表示するページ
 * /mypage/items/purchases
 */
const Page = async ({
  searchParams: { page = 1, size = 8, sort = "purchaseDate", order = "desc" },
}: Props) => {
  const user = await getSessionUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <MypageItemListContainer
      {...{ page, size, sort, order, buyerId: user.id }}
    />
  );
};

export default Page;
