"use server";

import { deleteItem, findItemById } from "@/repositories/item";
import { createItemReport } from "@/repositories/itemReport";
import { fetchVerifyResult } from "@/ui/form/securityVerifier/fetcher";
import { getSessionUser } from "@/utils";
import { revalidatePath } from "next/cache";

/**
 * 商品の削除
 * @param itemId 商品ID
 * @returns
 */
export const removeItem = async (itemId: string): Promise<void> => {
  const item = await findItemById(itemId);
  const user = await getSessionUser();
  if (item.sellerId !== user?.id) {
    throw new Error("商品の削除権限がありません");
  }
  await deleteItem(itemId);
  revalidatePath(`/item/${itemId}`);
};

/**
 * 商品の通報
 * @param itemId 商品ID
 * @param reason 通報理由
 * @param verificationCode reCAPTCHA認証コード
 * @returns
 */
export const addItemReport = async (
  itemId: string,
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
      message: "認証に失敗しました。再度認証を行ってください",
      error: true,
    };
  }
  const user = await getSessionUser();
  if (!user) {
    return {
      message: "セッションが切れました。再度ログインしてください",
      error: true,
    };
  }
  const userId = user.id;
  return await createItemReport(itemId, userId, reason);
};
