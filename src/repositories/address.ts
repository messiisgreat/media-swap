import "server-only";

import { type Address, type Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";

/**
 * 住所を登録,更新する関数
 * @param userId ユーザーID
 * @param address 住所
 * @returns 登録した住所
 */
export const upsertAddress = async (
  userId: string,
  address: Omit<Prisma.AddressCreateWithoutUserInput, "id">,
): Promise<Address> =>
  await prisma.address.upsert({
    where: { userId },
    update: { ...address },
    create: { ...address, user: { connect: { id: userId } } },
  });

/**
 * 住所を取得する関数
 * 不要な値が含まれないようにselectで指定している
 * @param userId  ユーザーID
 * @todo selectを網羅しなくても自動で書けるようにする
 */
export const findAddress = async (userId: string) =>
  await prisma.address.findFirst({
    select: {
      addressLine1: true,
      addressLine2: true,
      city: true,
      phoneNumber: true,
      postalCode: true,
      prefecture: true,
    },
    where: { userId },
  });
