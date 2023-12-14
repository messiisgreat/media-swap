"use server";

import { failure, success } from "@/lib/result";
import { createLike, deleteLike } from "@/repositories/like";
import { getSessionUser } from "@/utils";

/**
 * いいねをする
 * @param itemId 商品ID
 */
export async function like(itemId: string) {
  const user = await getSessionUser();
  if (!user) return failure("セッションが切れました。再度ログインしてください");
  const like = await createLike(itemId, user.id);
  if (!like) return failure("いいねできませんでした");
  return success();
}

/**
 * いいねを解除する
 * @param itemId 商品ID
 */
export async function unlike(itemId: string) {
  const user = await getSessionUser();
  if (!user) return failure("セッションが切れました。再度ログインしてください");
  const unliked = await deleteLike(itemId, user.id);
  if (!unliked) return failure("いいねを解除できませんでした");
  return success();
}
