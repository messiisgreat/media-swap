import "server-only";

import prisma from "@/lib/prisma";
import { type User } from "@prisma/client";

// 住所を含んだユーザー情報
export type UserReadResult = Awaited<ReturnType<typeof findUserById>>;

/**
 * ユーザーを取得する
 *
 * @param id ユーザーのID
 * @returns 取得したユーザー情報
 * @throws 製品が見つからない場合はエラーがスローされる
 */
export const findUserById = (id: string) =>
  prisma.user.findUniqueOrThrow({
    where: { id },
    include: {
      addresses: true,
    },
  });

/**
 * ユーザーを更新する
 * @param user ユーザー情報
 */
export const updateUser = (user: { id: User["id"] } & Partial<User>) => {
  const { id, ...data } = user;
  return prisma.user.update({
    where: { id },
    data,
  });
};

/**
 * idからユーザーとEmailVerificationCodeを取得する
 * @param id ユーザーID
 * @returns  ユーザーとEmailVerificationCode
 */
export const findUserByIdWithVerificationCode = (id: string) =>
  prisma.user.findUnique({
    where: { id },
    include: {
      emailVerificationCode: true,
    },
  });

/**
 * ユーザーを削除する
 * @param userId - 対象ユーザーのID
 */
export const deleteUser = (userId: string) =>
  prisma.user.update({
    where: { id: userId },
    data: {
      isDeleted: true,
      isEmailVerified: false,
    },
  });

/**
 * 認証コードをUserと紐付ける
 * @param userId - 対象ユーザーのID
 * @param emailVerificationCodeId - 認証コードのID
 */
export const connectVerificationCodeToUser = (
  userId: string,
  emailVerificationCodeId: string,
) =>
  prisma.user.update({
    where: { id: userId },
    data: {
      emailVerificationCode: {
        connect: { id: emailVerificationCodeId },
      },
    },
  });
