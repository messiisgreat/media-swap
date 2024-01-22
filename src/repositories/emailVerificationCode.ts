import "server-only";

import prisma from "@/lib/prisma";

/**
 * 認証コードをDBに保存する
 * @param userId 紐付けるユーザーのID
 * @param code 認証コード
 * @param expiredAt 認証コードの有効期限
 * @returns 保存された認証コードのID
 */
export const upsertEmailVerificationCode = async (
  userId: string,
  code: string,
  expiredAt: Date,
) =>
  await prisma.emailVerificationCode.upsert({
    where: {
      userId,
    },
    update: {
      code,
      expiredAt,
    },
    create: {
      userId,
      code,
      expiredAt,
    },
  });

/**
 * 認証コードをDBから取得する
 * @param code 認証コード
 * @throws 認証コードが見つからなかった場合
 */
export const findEmailVerificationCode = async (code: string) =>
  await prisma.emailVerificationCode.findUnique({
    where: {
      code,
    },
  });
