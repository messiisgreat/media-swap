import "server-only";

import prisma from "@/lib/prisma";

/** 取引コメント作成結果 */
export type TransactionCommentCreateResult = Awaited<
  ReturnType<typeof createTransactionComment>
>;

/**
 * 取引メッセージを作成
 * @param comment コメント
 * @param userId ユーザーID
 * @param transactionId 取引ID
 */
export const createTransactionComment = (
  comment: string,
  userId: string,
  transactionId: string,
) =>
  prisma.transactionComment.create({
    data: {
      comment,
      userId,
      transactionId,
    },
    include: {
      user: true,
      transaction: {
        include: {
          item: { include: { seller: true } },
          buyer: true,
        },
      },
    },
  });

/**
 * 取引メッセージを取得
 * @param transactionId 取引ID
 */
export const findTransactionComments = (transactionId: string) =>
  prisma.transactionComment.findMany({
    where: { transactionId },
    include: { user: { select: { name: true, image: true, id: true } } },
    orderBy: { createdAt: "asc" },
  });

/**
 * 取引メッセージを既読にする
 * @param transactionId 取引ID
 * @param userId ユーザーID
 */
export const updateTransactionComments = (
  transactionId: string,
  userId: string,
) =>
  prisma.transactionComment.updateMany({
    where: {
      transactionId,
      userId: { not: { equals: userId } },
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
