"use server";

import { createBrowsingHistory } from "@/repositories/browsingHistory";
import { findItemById, type ItemReadResult } from "@/repositories/item";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { notFound } from "next/navigation";

/**
 * 商品ページを開けたときに商品閲覧履歴を追加する
 * @param itemId 商品ID
 * @param sessionUserId ユーザーID
 * @returns 追加された閲覧履歴
 */
export const browsing = async (itemId: string, sessionUserId: string) => {
  return await createBrowsingHistory(sessionUserId, itemId);
};

/**
 * 商品を取得する
 * 存在し得ない商品IDが指定されたときや、指定された商品が存在しないときは404を返す
 * @param itemId 商品ID
 * @throws Error 想定外のエラーが発生したときサーバーエラーをThrowする
 */
export const findItemWithHandling = async (
  itemId: string,
): Promise<ItemReadResult> => {
  const itemIdRegex = /^[0-9a-fA-F]{24}$/;

  if (!itemIdRegex.test(itemId)) {
    notFound();
  }

  try {
    return await findItemById(itemId);
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      notFound();
    }
    throw error;
  }
};
