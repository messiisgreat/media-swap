import "server-only";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

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
  const session = await getServerSession(authOptions);
  if (!session) return undefined;
  return session.user;
};
