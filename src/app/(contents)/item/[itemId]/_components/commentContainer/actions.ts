"use server";

import { findComments } from "@/repositories/itemComment";

/**
 * コメントを取得
 * @param itemId 商品ID
 * @returns
 */
export const fetchComments = async (itemId: string) =>
  await findComments(itemId);
