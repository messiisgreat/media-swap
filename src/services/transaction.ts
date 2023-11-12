import "server-only";

import prisma from "@/lib/prisma";
import { Transaction } from "@prisma/client";
import { cache } from "react";

/**
 * 取引を取得する
 * @param id - 取得対象の取引のID
 * @returns 取得した取引、もしない場合はnull
 */
export const findTransaction = cache(async (id: string) => {
  return prisma.transaction.findUnique({
    where: { id },
    include: { transactionComments: true }
  });
});

/**
 * 取引を追加する
 * @param listingId - 取引対象の出品ID
 * @param buyerId - 取引対象のユーザーID
 * @param userCouponId - 取引対象のクーポンID
 * @returns 追加された取引
 */
export const createTransaction = async (
  listingId: string,
  buyerId: string,
  userCouponId: string | null = null,
) => {
  const transaction: Omit<
    Transaction,
    | "id"
    | "externalPaymentId"
    | "transactionStatusId"
    | "isCanceled"
    | "purchaseDate"
    | "transactionRatingId"
  > = {
    listingId,
    buyerId,
    userCouponId,
  };
  return prisma.transaction.create({
    data: {
      ...transaction,
    },
  });
};

/**
 * 取引を更新する
 * @param transaction - 更新する取引
 * @returns 更新された取引
 */
export const updateTransaction = async (transaction: Partial<Transaction>) => {
  return prisma.transaction.update({
    where: { id: transaction.id },
    data: transaction,
  });
};
