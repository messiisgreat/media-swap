import { findUserById } from "@/repositories/user";
import { TitleUnderbar } from "@/ui/structure";
import { notFound } from "next/navigation";

/**
 * ユーザーページ
 * /user/[userId]
 * @todo ユーザー情報を表示する
 */
const Page = async ({ params }: { params: { userId: string } }) => {
  const user = await findUserById(params.userId);
  if (!user) {
    notFound();
  }
  return <TitleUnderbar title="ユーザーページ" />;
};

export default Page;
