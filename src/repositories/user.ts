import "server-only";

import { cache } from "react";

import prisma from "@/lib/prisma";
import "server-only";

/**
 * idからユーザーを取得する
 * @param id ユーザーID
 * @returns ユーザー
 */
export const findUserById = cache(async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
  });
});

/**
 * メールアドレスを更新する
 * @param userId - 対象ユーザーのID
 * @param email  - 更新後のメールアドレス
 */
export const updateEmail = async (userId: string, email: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { email },
  });
};
