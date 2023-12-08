import "server-only";
import { cache } from "react";

import prisma from "@/lib/prisma";

/**
 * 商品の閲覧履歴を取得する
 * @param userId ユーザーID
 * @returns 閲覧履歴
 */
export const findBrowsingHistory = async (userId: string) => {
  return prisma.browsingHistory.findMany({
    where: { userId },
    orderBy: { browsedAt: "desc" },
  });
};

/**
 * 商品の閲覧履歴を作成する
 * @param userId ユーザーID
 * @param listingId 商品ID
 * @returns 作成された閲覧履歴
 */
export const createBrowsingHistory = cache(async (
  userId: string,
  listingId: string,
) => {
  return prisma.browsingHistory.create({
    data: {
      userId,
      listingId,
    },
  });
});
