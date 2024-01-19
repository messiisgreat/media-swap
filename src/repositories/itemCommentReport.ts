import prisma from "@/lib/prisma";
import "server-only";

/**
 * コメントの通報を取得する
 * @param itemCommentId コメントID
 * @param userId ユーザーID
 */
export const findItemCommentReport = (itemCommentId: string, userId: string) =>
  prisma.itemCommentReport.findFirst({
    where: {
      itemCommentId,
      userId,
    },
  });

/**
 * コメントの通報を作成する
 * @param itemCommentId コメントID
 * @param userId ユーザーID
 * @param reason 通報理由
 */
export const createItemCommentReport = (
  itemCommentId: string,
  userId: string,
  reason: string,
) =>
  prisma.itemCommentReport.create({
    data: {
      itemCommentId,
      userId,
      reason,
    },
  });
