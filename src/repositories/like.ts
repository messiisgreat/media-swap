import prisma from "@/lib/prisma";

/**
 * いいねを作成する
 * @param itemId 商品ID
 * @param userId ユーザーID
 * @returns
 */
export const createLike = (itemId: string, userId: string) =>
  prisma.like.create({
    data: {
      itemId,
      userId,
    },
  });

/**
 * いいねを削除する
 * @param itemId 商品ID
 * @param userId ユーザーID
 * @returns
 */
export const deleteLike = (itemId: string, userId: string) =>
  prisma.like.delete({
    where: {
      userId_itemId: {
        itemId,
        userId,
      },
    },
  });

/**
 * いいねを取得する
 * @param itemId 商品ID
 * @param userId ユーザーID
 */
export const findLike = (itemId: string, userId: string) =>
  prisma.like.findFirst({
    where: {
      itemId,
      userId,
    },
  });

/**
 * いいね数を取得する
 * @param itemId 商品ID
 */
export const countLike = (itemId: string) =>
  prisma.like.count({
    where: {
      itemId,
    },
  });
