import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

/**
 * 現在の認証セッション情報を取得します。
 * Serverとありますが、Clientでも動作します。
 * @returns セッション情報またはnull
 */
export async function getSession() {
  return getServerSession(authOptions);
}

/**
 * 現在の認証セッション情報からユーザー情報を取得します。
 * @returns ユーザー情報またはnull
 */
export const getSessionUser = async () => {
  const session = await getSession();
  return session?.user;
};
