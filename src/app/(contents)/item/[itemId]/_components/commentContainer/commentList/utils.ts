import { type ItemCommentsReadResult } from "@/repositories/itemComment";
import { type SessionUser } from "@/utils";

/**
 * 選択中のコメントがセッションユーザーのコメントかどうかを判定する
 * @param selectedCommentId 選択されたコメントID
 * @param comments コメント一覧のオブジェクト
 * @param sessionUser ログイン中のユーザー
 * @returns 選択中のコメントがセッションユーザーのコメントかどうか
 */
export const isCommentOwner = (
  selectedCommentId: string | null,
  comments: ItemCommentsReadResult,
  sessionUser: SessionUser | undefined,
) => {
  const selectedCommentUserId = comments.find(
    (comment) => comment.id === selectedCommentId,
  )?.userId;
  const isCommentOwner =
    selectedCommentUserId === sessionUser?.id &&
    selectedCommentUserId !== undefined;
  return isCommentOwner;
};
