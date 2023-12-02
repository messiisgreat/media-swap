import "server-only";

import prisma from "@/lib/prisma";

/**
 * メールアドレスを更新する
 * @param userId - 対象ユーザーのID
 * @param email  - 更新後のメールアドレス
 */
export const updateEmail = async (userId: string, email: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { email },
  });
};
