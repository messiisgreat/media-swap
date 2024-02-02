"use server";

import {
  likeFailedMessage,
  sessionTimeOutMessage,
  unlikeFailedMessage,
} from "@/constants/errorMessage";
import { failure, success, type Result } from "@/lib/result";
import { createLike, deleteLike } from "@/repositories/like";
import { getSessionUser } from "@/utils";
import { revalidatePath } from "next/cache";

export type LikeResult = Result<undefined, string>;

/**
 * いいねをする
 * @param itemId 商品ID
 */
export const like = async (itemId: string): Promise<LikeResult> => {
  const user = await getSessionUser();
  if (!user) return failure(sessionTimeOutMessage);
  try {
    const like = await createLike(itemId, user.id);
    if (!like) return failure(likeFailedMessage);
    revalidatePath(`/item/${itemId}`);
    return success();
  } catch {
    return failure(likeFailedMessage);
  }
};

/**
 * いいねを解除する
 * @param itemId 商品ID
 */
export const unlike = async (itemId: string): Promise<LikeResult> => {
  const user = await getSessionUser();
  if (!user) return failure(sessionTimeOutMessage);
  try {
    const like = await deleteLike(itemId, user.id);
    if (!like) return failure(unlikeFailedMessage);
    revalidatePath(`/item/${itemId}`);
    return success();
  } catch {
    return failure(unlikeFailedMessage);
  }
};
