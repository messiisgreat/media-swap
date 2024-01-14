import "server-only";

import prisma from "@/lib/prisma";
import { type User } from "@prisma/client";
import { cache } from "react";

// 住所を含んだユーザー情報
export type UserReadResult = Awaited<ReturnType<typeof findUserById>>;

/**
 * ユーザーを取得する
 *
 * @param {string} id - ユーザーのID
 * @returns 取得したユーザー情報
 * @throws 製品が見つからない場合はエラーがスローされる
 */
export const findUserById = cache(
  async (id: string) =>
    await prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        addresses: true,
      },
    }),
);

/**
 * ユーザーを更新する
 * @param user ユーザー情報
 */
export const updateUser = async (user: { id: User["id"] } & Partial<User>) => {
  const { id, ...data } = user;
  return await prisma.user.update({
    where: { id },
    data,
  });
};

/**
 * ユーザーを削除する
 * @param userId - 対象ユーザーのID
 */
export const deleteUser = async (userId: string) =>
  await prisma.user.update({
    where: { id: userId },
    data: {
      isDeleted: true,
    },
  });
