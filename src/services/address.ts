import "server-only";

import prisma from "@/lib/prisma";
import { Address } from "@prisma/client";

/**
 * 住所を登録する関数
 * @param userId ユーザーID
 * @param postalCode 郵便番号
 * @param prefecture 都道府県
 * @param city 市町村
 * @param addressLine1 住所1
 * @param addressLine2 住所2
 * @param phoneNumber 電話番号
 * @returns 登録した住所
 */
export const createAddress = async (
  userId: string,
  postalCode: string,
  prefecture: string,
  city: string,
  addressLine1: string,
  addressLine2: string | null,
  phoneNumber: string,
): Promise<Address> => {
  return await prisma.address.create({
    data: {
      userId,
      postalCode,
      prefecture,
      city,
      addressLine1,
      addressLine2,
      phoneNumber,
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
