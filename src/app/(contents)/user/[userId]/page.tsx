import { UserInfoContainer } from "@/app/(contents)/user/[userId]/_conponents/UserInfoContainer";
import { findUserById } from "@/repositories/user";
import { TitleUnderbar } from "@/ui/structure";
import { type Item } from "@prisma/client";
import { notFound } from "next/navigation";

type Props = {
  params: { userId: string };
  searchParams: {
    query: string;
    page: number;
    size: number;
    sort: keyof Item;
    order: "asc" | "desc";
  };
};

/**
 * ユーザーページ
 * /user/[userId]
 * @todo ユーザー情報を表示する
 */
const Page = async ({
  params,
  searchParams: { page = 1, size = 27, sort = "createdAt", order = "desc" },
}: Props) => {
  const user = await findUserById(params.userId);
  if (!user) {
    notFound();
  }
  return (
    <>
      <TitleUnderbar title="ユーザーページ" />
      <UserInfoContainer
        {...{ page, size, sort, order }}
        user={user}
        isPublic
      />
    </>
  );
};

export default Page;
