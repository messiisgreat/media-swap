import "server-only";

import prisma from "@/lib/prisma";

/**
 * 商品の閲覧履歴を作成する
 * @param itemId 商品ID
 * @param userId ユーザーID
 * @returns 作成された閲覧履歴
 */
export const createBrowsingHistory = (itemId: string, userId?: string) =>
  prisma.browsingHistory.create({
    data: { userId, itemId },
  });

/**
 * 商品の閲覧数を取得する
 * @param itemId 商品ID
 * @returns 閲覧数
 */
export const countBrowsingHistory = (itemId: string) =>
  prisma.browsingHistory.count({
    where: { itemId },
  });
