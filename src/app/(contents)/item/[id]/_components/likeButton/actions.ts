"use server";

import { failure, success, type Result } from "@/lib/result";
import { createLike, deleteLike } from "@/repositories/like";
import { getSessionUser } from "@/utils";

export type LikeResult = Result<undefined, string>;

/**
 * いいねをする
 * @param itemId 商品ID
 */
export async function like(itemId: string): Promise<LikeResult> {
  const user = await getSessionUser();
  if (!user) return failure("セッションが切れました。再度ログインしてください");
  try {
    const like = await createLike(itemId, user.id);
    if (!like) return failure("いいねできませんでした");
    return success();
  } catch {
    return failure("いいねできませんでした");
  }
}

/**
 * いいねを解除する
 * @param itemId 商品ID
 */
export async function unlike(itemId: string): Promise<LikeResult> {
  const user = await getSessionUser();
  if (!user) return failure("セッションが切れました。再度ログインしてください");
  try {
    const like = await deleteLike(itemId, user.id);
    if (!like) return failure("いいねを解除できませんでした");
    return success();
  } catch {
    return failure("いいねを解除できませんでした");
  }
}

/**
 * いいねを切り替える
 * @param itemId 商品ID
 * @param isLiked いいね済みかどうか
 */
export async function toggleLike(itemId: string, isLiked: boolean) {
  if (isLiked) {
    return await unlike(itemId);
  } else {
    return await like(itemId);
  }
}
