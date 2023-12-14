import "server-only";

import prisma from "@/lib/prisma";
import { cache } from "react";

/**
 * 商品を取得する
 *
 * @param {string} id - ユーザーのID
 * @returns 取得したユーザー情報
 * @throws 製品が見つからない場合はエラーがスローされる
 */
export const findUserById = cache(async (id: string) => {
  return await prisma.user.findUniqueOrThrow({
    where: { id },
    include: {
      addresses: true,
    },
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
