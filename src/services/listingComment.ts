import "server-only";

import prisma from "@/lib/prisma";
import { ListingComment, User } from "@prisma/client";

export type CommentWithPartialUser = ListingComment & {
  user: Partial<Pick<User, "name" | "image">>;
};
/**
 * コメントを取得する
 * @param listingId 取得対象の製品のID
 * @returns 取得したコメント
 */
export const getComments = async (
  listingId: string,
): Promise<CommentWithPartialUser[]> => {
  const comments = await prisma.listingComment.findMany({
    where: { listingId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: { user: { select: { name: true, image: true } } },
  });
  return comments.filter((comment) => !comment.deletedAt);
}

/**
 * コメントを追加する
 * @param comment コメントの内容
 * @param userId ユーザーID
 * @param listingId 商品ID
 */
export async function createComment(
  comment: string,
  userId: string,
  listingId: string,
) {
  return prisma.listingComment.create({
    data: {
      listingId,
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
  const existingReport = await prisma.listingCommentReport.findFirst({
    where: {
      listingCommentId: commentId,
      userId: userId,
    },
  });

  if (existingReport) {
    throw new Error("This comment has already been reported by the user.");
  }

  return prisma.listingCommentReport.create({
    data: {
      listingCommentId: commentId,
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
export async function deleteListingComment(
  commentId: string,
  userId: string,
) {
  const comment = await prisma.listingComment.findUnique({
    where: { id: commentId },
    include: { listing: { select: { sellerId: true } } }
  });
  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.listing.sellerId !== userId) {
    throw new Error("You are not the seller of this listing");
  }

  return prisma.listingComment.update({
    where: { id: commentId },
    data: {
      deletedAt: new Date(),
    },
  });
}
