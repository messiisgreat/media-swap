import "server-only";

import { ListingComment, User } from "@prisma/client";
import prisma from "@/lib/prisma";

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
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  const commentsWithUserNameAndImage = comments.map((comment) => {
    return {
      ...comment,
      user: {
        name: comment.user?.name,
        image: comment.user?.image,
      },
    };
  });

  return commentsWithUserNameAndImage;
};

/**
 * コメントを追加する
 * @param text コメントの内容
 * @param userId ユーザーID
 * @param listingId 商品ID
 */
export async function createComment(text: string, userId: string, listingId: string) {
  await prisma.listingComment.create({
    data: {
      listingId,
      userId,
      comment: text,
    },
  });
};
