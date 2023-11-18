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
): Promise<CommentWithPartialUser[]> =>
  prisma.listingComment.findMany({
    where: { listingId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: { user: { select: { name: true, image: true } } },
  });

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
  return prisma.listingCommentReport.create({
    data: {
      listingCommentId: commentId,
      userId,
      reason,
    },
  });
}