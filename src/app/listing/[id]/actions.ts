"use server";

import { createTransaction } from "@/services/transaction";
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
  userCouponId: string,
) => {
  await createTransaction(listingId, buyerId, userCouponId);
  revalidatePath("/products/[id]");
};
