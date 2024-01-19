"use server";

import {
  createItemCommentReport,
  findItemCommentReport,
} from "@/repositories/itemCommentReport";

/**
 * コメントの通報処理を行う
 * @param commentId コメントID
 * @param userId ユーザーID
 * @param reason 通報理由
 */
export const reportComment = async (
  commentId: string,
  userId: string,
  reason: string,
) => {
  const existingReport = await findItemCommentReport(commentId, userId);
  if (existingReport) {
    throw new Error("This comment has already been reported by the user.");
  }
  return await createItemCommentReport(commentId, userId, reason);
};
