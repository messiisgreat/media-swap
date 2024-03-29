import "server-only";

import prisma from "@/lib/prisma";

/** 商品コメント取得結果 */
export type ItemCommentsReadResult = Awaited<
  ReturnType<typeof findItemComments>
>;

/** 商品コメント作成結果 */
export type ItemCommentsCreateResult = Awaited<
  ReturnType<typeof createItemComment>
>;

/**
 * コメントを追加する
 * @param comment コメントの内容
 * @param userId ユーザーID
 * @param itemId 商品ID
 */
export const createItemComment = (
  comment: string,
  userId: string,
  itemId: string,
) =>
  prisma.itemComment.create({
    data: { itemId, userId, comment },
    include: {
      user: true,
      item: {
        include: {
          seller: true,
        },
      },
    },
  });

/**
 * コメントを取得する
 * @param itemId 取得対象の製品のID
 * @returns 取得したコメント
 */
export const findItemComments = (itemId: string) =>
  prisma.itemComment.findMany({
    where: { itemId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: { user: { select: { id: true, name: true, image: true } } },
  });

/**
 * コメントを論理削除する
 * ユーザーIDとコメントのユーザーIDが一致するか、出品者であれば削除可能
 * @param id コメントID
 * @param userId ユーザーID
 */
export const deleteItemComment = (id: string, userId: string) =>
  prisma.itemComment.update({
    where: { id, OR: [{ userId }, { item: { sellerId: userId } }] },
    data: { deletedAt: new Date() },
    select: { itemId: true },
  });
