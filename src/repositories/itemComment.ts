import "server-only";

import { type ItemComment, type User } from "@prisma/client";

import prisma from "@/lib/prisma";
import { cache } from "react";

export type CommentWithPartialUser = ItemComment & {
  user: Partial<Pick<User, "name" | "image">>;
};
/**
 * コメントを取得する
 * @param itemId 取得対象の製品のID
 * @returns 取得したコメント
 */
export const findComments = cache(
  async (itemId: string): Promise<CommentWithPartialUser[]> => {
    return await prisma.itemComment.findMany({
      where: { itemId, deletedAt: null },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      include: { user: { select: { name: true, image: true } } },
    });
  },
);

/**
 * コメントを追加する
 * @param comment コメントの内容
 * @param userId ユーザーID
 * @param itemId 商品ID
 */
export async function createComment(
  comment: string,
  userId: string,
  itemId: string,
) {
  return await prisma.itemComment.create({
    data: {
      itemId,
      userId,
      comment,
    },
  });
}

/**
 * コメントの通報
 * @param commentId コメントのID
 * @param userId 通報ユーザーID
 * @param reason 通報理由
 * @returns
 * @throws 通報済みの場合
 */
export async function createCommentReport(
  commentId: string,
  userId: string,
  reason: string,
) {
  // 既に同じユーザーによる通報があるか確認
  const existingReport = await prisma.itemCommentReport.findFirst({
    where: {
      itemCommentId: commentId,
      userId: userId,
    },
  });

  if (existingReport) {
    throw new Error("This comment has already been reported by the user.");
  }

  return await prisma.itemCommentReport.create({
    data: {
      itemCommentId: commentId,
      userId,
      reason,
    },
  });
}

/**
 * コメントを削除する
 * @param commentId コメントID
 * @param userId 削除を行うユーザーID
 * @returns
 * @throws コメントが見つからない場合
 * @throws 出品者以外が削除しようとした場合
 */
export async function deleteItemComment(commentId: string, userId: string) {
  const comment = await prisma.itemComment.findUnique({
    where: { id: commentId },
    include: { item: { select: { sellerId: true } } },
  });
  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.item.sellerId !== userId) {
    throw new Error("You are not the seller of this item");
  }

  return await prisma.itemComment.update({
    where: { id: commentId },
    data: {
      deletedAt: new Date(),
    },
  });
}
