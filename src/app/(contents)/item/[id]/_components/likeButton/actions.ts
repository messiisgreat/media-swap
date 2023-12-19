"use server";

import { failure, success, type Result } from "@/lib/result";
import { createLike, deleteLike } from "@/repositories/like";
import { getSessionUser } from "@/utils";
import { revalidatePath } from "next/cache";

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
    revalidatePath(`/items/${itemId}`);
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
    revalidatePath(`/items/${itemId}`);
    return success();
  } catch {
    return failure("いいねを解除できませんでした");
  }
}
