import { cache } from "react";
import "server-only";

import prisma from "@/lib/prisma";

/**
 * 商品の閲覧履歴を作成する
 * @param userId ユーザーID
 * @param itemId 商品ID
 * @returns 作成された閲覧履歴
 */
export const createBrowsingHistory = cache(
  async (itemId: string, userId?: string) =>
    await prisma.browsingHistory.create({
      data: { userId, itemId },
    }),
);

/**
 * 商品の閲覧数を取得する
 * @param itemId 商品ID
 * @returns 閲覧数
 */
export const countBrowsingHistory = cache(
  async (itemId: string, userId?: string) => 
  
    await prisma.browsingHistory.count({
      where: {
        itemId,
        userId: {not: userId},
      }
    })
);
