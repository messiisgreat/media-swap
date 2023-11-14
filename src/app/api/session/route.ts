import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

/**
 * セッションを取得する
 */
export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return { status: 401 };
  return { body: session };
};
