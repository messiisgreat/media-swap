"use server";

import { failure, success } from "@/lib/result";
import { createLike, deleteLike } from "@/repositories/like";
import { getSessionUser } from "@/utils";

/**
 * いいねをする
 * @param listingId 商品ID
 */
export async function like(listingId: string) {
  const user = await getSessionUser();
  if (!user) return failure("セッションが切れました。再度ログインしてください");
  const like = await createLike(listingId, user.id);
  if (!like) return failure("いいねできませんでした");
  return success();
}

/**
 * いいねを解除する
 * @param listingId 商品ID
 */
export async function unlike(listingId: string) {
  const user = await getSessionUser();
  if (!user) return failure("セッションが切れました。再度ログインしてください");
  const unliked = await deleteLike(listingId, user.id);
  if (!unliked) return failure("いいねを解除できませんでした");
  return success();
}
