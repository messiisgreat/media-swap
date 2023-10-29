import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * 現在の認証セッション情報を取得します。
 * この関数は、next-authのgetServerSessionを利用して、
 * サーバーサイドでのセッション取得を実現します。
 *
 * @async
 * @returns {Promise<object|null>} セッションデータを含むプロミスオブジェクト。
 * セッションが存在しない場合はnullを返します。
 */
export default async function getSession() {
  return await getServerSession(authOptions);
}
