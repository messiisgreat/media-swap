import { MypageItemListContainer } from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemListContainer";
import { getSessionUser } from "@/utils/session";
import { type Item } from "@prisma/client";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    page: number;
    size: number;
    sort: keyof Item;
    order: "asc" | "desc";
  };
};

/**
 * 閲覧履歴一覧を表示するページ
 * /mypage/items/browsing-history
 */
const Page = async ({
  searchParams: { page = 1, size = 27, sort = "createdAt", order = "desc" },
}: Props) => {
  const user = await getSessionUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <MypageItemListContainer
      {...{ page, size, sort, order, type: "browsingHistory" }}
    />
  );
};

export default Page;
