import "server-only";

import prisma from "@/lib/prisma";

/**
 * 取引コメントを取得
 * @param transactionId 取引ID
 * @returns コメントの配列
 */
export const getTransactionComments = async (transactionId: string) =>
  await prisma.transactionComment.findMany({
    where: { transactionId },
    include: { user: { select: { name: true, image: true, id: true } } },
    orderBy: { createdAt: "asc" },
  });

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
) =>
  await prisma.transactionComment.create({
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
