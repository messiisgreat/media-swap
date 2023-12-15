import prisma from "@/lib/prisma";

/**
 * いいねを作成する
 * @param itemId 商品ID
 * @param userId ユーザーID
 * @returns
 */
export const createLike = async (itemId: string, userId: string) => {
  return await prisma.like.create({
    data: {
      itemId,
      userId,
    },
  });
};

/**
 * いいねを削除する
 * @param itemId 商品ID
 * @param userId ユーザーID
 * @returns
 */
export const deleteLike = async (itemId: string, userId: string) => {
  return await prisma.like.delete({
    where: {
      userId_itemId: {
        itemId,
        userId,
      },
    },
  });
};

/**
 * いいねを取得する
 * @param itemId 商品ID
 * @param userId ユーザーID
 */
export const findLike = async (itemId: string, userId: string) => {
  return await prisma.like.findFirst({
    where: {
      itemId,
      userId,
    },
  });
};

/**
 * いいね数を取得する
 * @param itemId 商品ID
 */
export const countLike = async (itemId: string) => {
  return await prisma.like.count({
    where: {
      itemId,
    },
  });
};
