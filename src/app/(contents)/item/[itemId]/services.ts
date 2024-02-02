"use server";

import { findItemById, type ItemReadResult } from "@/repositories/item";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { notFound } from "next/navigation";

const itemIdRegex = /^[0-9a-fA-F]{24}$/;

const recordNotFoundCode = "P2025";

/**
 * 商品を取得する
 * 存在し得ない商品IDが指定されたときや、指定された商品が存在しないときは404を返す
 * @param itemId 商品ID
 * @throws Error 想定外のエラーが発生したときサーバーエラーをThrowする
 */
export const findItemWithHandling = async (
  itemId: string,
): Promise<ItemReadResult> => {
  if (!itemIdRegex.test(itemId)) {
    notFound();
  }

  try {
    return await findItemById(itemId);
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === recordNotFoundCode
    ) {
      notFound();
    }
    throw error;
  }
};
