"use server";

import { failure, success, type Result } from "@/lib/result";
import { deleteUser } from "@/repositories/user";

/**
 * 退会の処理を行う
 * @param userId - 対象ユーザーのID
 */
export const leaveUser = async (
  userId: string,
): Promise<Result<undefined, string>> => {
  try {
    await deleteUser(userId);
  } catch (e) {
    return failure("退会処理に失敗しました");
  }
  return success();
};
