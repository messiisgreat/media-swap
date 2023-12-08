import "server-only";

import { cache } from "react";

import { Transaction } from "@prisma/client";

import { TRANSACTION_STATUS } from "@/constants/listing";
import prisma from "@/lib/prisma";

/**
 * 取引を取得する
 * @param id - 取得対象の取引のID
 * @returns 取得した取引、もしない場合はnull
 */
export const findTransaction = cache(async (id: string) => {
  return prisma.transaction.findUnique({
    where: { id },
    include: {
      transactionComments: true,
      buyer: true,
      listing: { include: { seller: true, shippingMethod: true } },
    },
  });
});

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
  const transaction: Omit<
    Transaction,
    | "id"
    | "externalPaymentId"
    | "isCanceled"
    | "purchaseDate"
    | "transactionRatingId"
    | "transactionStatus"
    | "trackingNumber"
  > = {
    listingId,
    buyerId,
    userCouponId,
  };
  return prisma.transaction.create({
    data: {
      transactionStatus: TRANSACTION_STATUS.BEFORE_PAYMENT,
      ...transaction,
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
  const { id, ...updateData } = transaction;
  return prisma.transaction.update({
    where: { id: id },
    data: updateData,
  });
};

/**
 * 取引ステータスを更新する
 * @param transaction - 更新する取引
 * @returns 更新された取引
 */
export const updateTransactionStatus = async (
  transaction: { id: string } & Partial<Transaction>,
) => {
  return prisma.transaction.update({
    where: { id: transaction.id },
    data: {
      transactionStatus: transaction.transactionStatus,
    },
  });
};

/**
 * 取引コメントを取得
 * @param transactionId 取引ID
 * @returns コメントの配列
 */
export const getTransactionComments = async (transactionId: string) => {
  const comments = await prisma.transactionComment.findMany({
    where: { transactionId },
    include: { user: { select: { name: true, image: true, id: true } } },
    orderBy: { createdAt: "asc" },
  });
  return comments;
};

/**
 * 取引メッセージを作成
 * @param text コメント
 * @param userId ユーザーID
 * @param transactionId 取引ID
 */
export const createTransactionComment = async (
  text: string,
  userId: string,
  transactionId: string,
) => {
  return await prisma.transactionComment.create({
    data: {
      comment: text,
      userId,
      transactionId,
    },
    include: {
      user: true,
      transaction: {
        include: {
          listing: { include: { seller: true } },
          buyer: true,
        },
      },
    },
  });
};

/**
 * 既読にする
 * @param transactionId 取引ID
 * @param userId メッセージを見た側のユーザーID
 */
export const markAsReadTransactionComments = async (
  transactionId: string,
  userId: string,
) => {
  await prisma.transactionComment.updateMany({
    where: {
      transactionId,
      userId: { not: { equals: userId } },
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
};
