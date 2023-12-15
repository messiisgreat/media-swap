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
  async (userId: string, itemId: string) => {
    return await prisma.browsingHistory.create({
      data: {
        userId,
        itemId,
      },
    });
  },
);
