import "server-only";

import { type Address } from "@prisma/client";

import prisma from "@/lib/prisma";

/**
 * 住所を登録,更新する関数
 * @param address 住所
 * @returns 登録した住所
 */
export const upsertAddress = async (
  address: Omit<Address, "id">,
): Promise<Address> => {
  return await prisma.address.upsert({
    where: {
      userId: address.userId,
    },
    update: {
      ...address,
      userId: undefined,
    },
    create: {
      ...address,
    },
  });
};

/**
 * 住所を取得する関数
 * @param userId  ユーザーID
 */
export const getAddress = async (userId: string) => {
  return await prisma.address.findFirst({
    where: { userId },
  });
};
