import "server-only";

import { cache } from "react";

import { type Transaction } from "@prisma/client";

import { TRANSACTION_STATUS } from "@/constants/listing";
import prisma from "@/lib/prisma";

/** 出品情報と購入者を含んだ取引作成結果 */
export type TransactionCreateResult = Awaited<
  ReturnType<typeof createTransaction>
>;

/**
 * 取引を取得する
 * @param id - 取得対象の取引のID
 * @returns 取得した取引、もしない場合はnull
 */
export const findTransaction = cache(
  async (id: string) =>
    await prisma.transaction.findUnique({
      where: { id },
      include: {
        transactionComments: true,
        buyer: true,
        listing: { include: { seller: true, shippingMethod: true } },
      },
    }),
);

/**
 * 取引を追加する
 * @param listingId - 取引対象の出品ID
 * @param buyerId - 取引対象のユーザーID
 * @param userCouponId - 取引対象のクーポンID (オプション)
 * @returns 追加された取引
 */
export const createTransaction = async (
  listingId: string,
  buyerId: string,
  userCouponId: string | null = null,
) => {
  return await prisma.transaction.create({
    data: {
      transactionStatus: TRANSACTION_STATUS.BEFORE_PAYMENT,
      buyer: { connect: { id: buyerId } },
      listing: { connect: { id: listingId } },
      ...(userCouponId
        ? { userCoupon: { connect: { id: userCouponId } } }
        : {}),
    },
    include: {
      listing: { include: { seller: true } },
      buyer: true,
    },
  });
};

/**
 * 取引を更新する
 * @param transaction - 更新する取引
 * @returns 更新された取引
 */
export const updateTransaction = async (
  transaction: { id: string } & Partial<Transaction>,
) => {
  const { id, ...data } = transaction;
  return await prisma.transaction.update({
    where: { id },
    data,
  });
};

/**
 * 取引ステータスを更新する
 * @param transaction - 更新する取引
 * @returns 更新された取引
 */
export const updateTransactionStatus = async (
  transaction: { id: string } & Partial<Transaction>,
) =>
  await prisma.transaction.update({
    where: { id: transaction.id },
    data: {
      transactionStatus: transaction.transactionStatus,
    },
  });
