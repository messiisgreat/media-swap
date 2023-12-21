import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

/**
 * 現在の認証セッション情報を取得します。
 * Serverとありますが、Clientでも動作します。
 * @returns セッション情報またはnull
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/** セッションユーザーの共通型 */
export type SessionUser = {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

/**
 * 現在の認証セッション情報からユーザー情報を取得します。
 * @returns ユーザー情報またはnull
 */
export const getSessionUser = async (): Promise<SessionUser | undefined> => {
  const session = await getSession();
  return session?.user;
};
