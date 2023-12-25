import "server-only";

import { cache } from "react";

import { type Transaction } from "@prisma/client";

import { TRANSACTION_STATUS } from "@/constants/item";
import prisma from "@/lib/prisma";

/** 出品情報と購入者を含んだ取引作成結果 */
export type TransactionCreateResult = Awaited<
  ReturnType<typeof createTransaction>
>;

export type TransactionReadResult = Awaited<ReturnType<typeof findTransaction>>;

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
        item: {
          select: {
            seller: { select: { id: true, name: true, image: true } },
            shippingMethodCode: true,
          },
        },
      },
    }),
);

/**
 * 取引を追加する
 * @param itemId - 取引対象の出品ID
 * @param buyerId - 取引対象のユーザーID
 * @param userCouponId - 取引対象のクーポンID (オプション)
 * @returns 追加された取引
 */
export const createTransaction = async (
  itemId: string,
  buyerId: string,
  userCouponId: string | null = null,
) => await prisma.transaction.create({
    data: {
      item: { connect: { id: itemId } },
      buyer: { connect: { id: buyerId } },
      transactionStatus: TRANSACTION_STATUS.BEFORE_PAYMENT,
      ...(userCouponId
        ? { userCoupon: { connect: { id: userCouponId } } }
        : {}),
    },
    include: {
      item: { include: { seller: true } },
      buyer: true,
    },
  });

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
