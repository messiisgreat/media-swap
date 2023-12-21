import prisma from "@/lib/prisma";
import "server-only";

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
