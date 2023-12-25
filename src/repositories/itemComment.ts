import "server-only";

import prisma from "@/lib/prisma";
import { cache } from "react";

export type ItemCommentsReadResult = Awaited<ReturnType<typeof findComments>>;

/**
 * コメントを追加する
 * @param comment コメントの内容
 * @param userId ユーザーID
 * @param itemId 商品ID
 */
export const createComment = async (comment: string, userId: string, itemId: string) => await prisma.itemComment.create({
    data: {
      itemId,
      userId,
      comment,
    },
  });

/**
 * コメントを取得する
 * @param itemId 取得対象の製品のID
 * @returns 取得したコメント
 */
export const findComments = cache(async (itemId: string) => await prisma.itemComment.findMany({
    where: { itemId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: { user: { select: { id: true, name: true, image: true } } },
  }));

/**
 * コメントを削除する
 * ユーザーIDとコメントのユーザーIDが一致するか、出品者であれば削除可能
 * @param id コメントID
 * @param userId ユーザーID
 */
export const deleteItemComment = async (id: string, userId: string) => await prisma.itemComment.update({
    where: { id, OR: [{ userId }, { item: { sellerId: userId } }] },
    data: {
      deletedAt: new Date(),
    },
    select: { itemId: true },
  });
