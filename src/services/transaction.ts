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
    include: { transactionComments: true, buyer: true, listing: { include: { seller: true } } }
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
    | "isCanceled"
    | "purchaseDate"
    | "transactionRatingId"
    | "transactionStatus"
  > = {
    listingId,
    buyerId,
    userCouponId,
  };
  return prisma.transaction.create({
    data: {
      transactionStatus: 0,
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
  if (!transaction.id) throw new Error("idが指定されていません");
  return prisma.transaction.update({
    where: { id: transaction.id },
    data: transaction,
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
    include: { user: true },
  });
  return comments.map((comment) => {
    return {
      ...comment,
      user: {
        name: comment.user.name,
        image: comment.user.image,
        id: comment.user.id
      },
    };
  });
}

/**
 * 取引メッセージを作成
 * @param text コメント
 * @param userId ユーザーID
 * @param transactionId 取引ID
 */
export const createTransactionComment = async (
  text: string,
  userId: string,
  transactionId: string
) => {
  await prisma.transactionComment.create({
    data: {
      comment: text,
      userId,
      transactionId,
    },
    include: { user: true },
  });
}

/**
 * 既読にする
 * @param transactionId 取引ID 
 * @param userId メッセージを見た側のユーザーID
 */
export const markAsReadTransactionComments = async (
  transactionId: string,
  userId: string
) => {
  await prisma.transactionComment.updateMany({
    where: {
      transactionId,
      userId: { not: userId },
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
}