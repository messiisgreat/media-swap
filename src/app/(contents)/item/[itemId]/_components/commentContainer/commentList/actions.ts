"use server";

import { reportComment } from "@/app/(contents)/item/[itemId]/_components/commentContainer/commentList/services";
import { authenticationFailedMessage, sessionTimeOutMessage } from "@/constants/errorMessage";
import { failure, success, type Result } from "@/lib/result";
import { deleteItemComment } from "@/repositories/itemComment";
import { fetchVerifyResult } from "@/ui/form/securityVerifier/fetcher";
import { getSessionUser } from "@/utils";

/**
 * コメントを削除
 * @param commentId コメントID
 */
export const removeItemComment = async (
  commentId: string,
): Promise<
  Result<
    {
      itemId: string;
    },
    string
  >
> => {
  const user = await getSessionUser();
  if (!user) return failure(sessionTimeOutMessage);
  const comment = await deleteItemComment(commentId, user.id);
  if (!comment) return failure("削除可能なコメントが見つかりませんでした");
  return success(comment);
};

/**
 * コメントの通報
 * @param commentId コメントID
 * @param reason 通報理由
 * @param verificationCode reCAPTCHA v3で取得した値
 * @returns
 */
export const addItemCommentReport = async (
  commentId: string,
  reason: string,
  verificationCode: string,
) => {
  if (!verificationCode) {
    return {
      message: "認証を行ってください",
      error: true,
    };
  }
  const verifyResult = await fetchVerifyResult(verificationCode);
  if (!verifyResult) {
    return {
      message: authenticationFailedMessage,
      error: true,
    };
  }
  const user = await getSessionUser();
  if (!user)
    return {
      message: sessionTimeOutMessage,
      error: true,
    };
  const userId = user.id;
  return await reportComment(commentId, userId, reason);
};
