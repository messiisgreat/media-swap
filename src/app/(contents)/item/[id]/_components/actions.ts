"use server";

import { countBrowsingHistory, createBrowsingHistory } from "@/repositories/browsingHistory";
import { findItemById, type ItemReadResult } from "@/repositories/item";
import { findComments } from "@/repositories/itemComment";
import { getSessionUser } from "@/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { notFound } from "next/navigation";

/**
 * 商品閲覧履歴を追加する
 * Sessionが切れているなどでログインしていない場合はユーザーなしで追加する
 * @param itemId 商品ID
 * @returns 追加された閲覧履歴
 */
export const browsing = async (itemId: string) => {
  const sessionUser = await getSessionUser();
  const sessionUserId = sessionUser?.id;
  return await createBrowsingHistory(sessionUserId!, itemId);
};

/**
 * 閲覧数を取得する
 * @param itemId 商品ID
 * @returns 
 */
export const getViewCount = async (itemId: string) => await countBrowsingHistory(itemId);

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

/**
 * コメントを取得
 * @param itemId 商品ID
 * @returns
 */
export const fetchComments = async (itemId: string) => await findComments(itemId);
