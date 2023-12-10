import prisma from "@/lib/prisma";
import { cache } from "react";

/**
 * いいねを作成する
 * @param listingId 商品ID
 * @param userId ユーザーID
 * @returns
 */
export const createLike = async (listingId: string, userId: string) => {
  return await prisma.like.create({
    data: {
      listingId,
      userId,
    },
  });
};

/**
 * いいねを削除する
 * @param listingId 商品ID
 * @param userId ユーザーID
 * @returns
 */
export const deleteLike = async (listingId: string, userId: string) => {
  return await prisma.like.delete({
    where: {
      userId_listingId: {
        listingId,
        userId,
      },
    },
  });
};

/**
 * いいねを取得する
 * @param listingId 商品ID
 * @param userId ユーザーID
 */
export const findLike = cache(async (listingId: string, userId: string) => {
  return await prisma.like.findFirst({
    where: {
      listingId,
      userId,
    },
  });
});

/**
 * いいね数を取得する
 * @param listingId 商品ID
 */
export const countLike = cache(async (listingId: string) => {
  return await prisma.like.count({
    where: {
      listingId,
    },
  });
});
