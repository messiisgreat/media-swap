"use server";

import { createComment, getComments } from "@/services/listingComment";
import { createTransaction } from "@/services/transaction";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";

/**
 * 購入ボタンを押したときのサーバー側処理
 * 取引を追加し、商品ページをrevalidateする
 * @param listingId - 購入対象の出品ID
 * @param buyerId - 購入対象のユーザーID
 * @param userCouponId - 購入対象のクーポンID
 */
export const purchasing = async (
  listingId: string,
  buyerId: string,
  userCouponId: string | null,
) => {
  await createTransaction(listingId, buyerId, userCouponId);
  revalidatePath("/products/[id]");
};

/**
 * コメントを書く
 * @param text コメント
 * @param sessionUser セッションユーザー
 * @param listingId 商品ID
 */
export const addComment = async (
  text: string,
  sessionUser: Session["user"],
  listingId: string,
) => {
  if (text.length > 300)
    throw new Error("コメントは300文字以内で入力してください");
  await createComment(text, sessionUser.id, listingId);
};

/**
 * コメントを取得
 * @param listingId 商品ID
 * @returns
 */
export const fetchComments = async (listingId: string) => {
  return await getComments(listingId);
};
