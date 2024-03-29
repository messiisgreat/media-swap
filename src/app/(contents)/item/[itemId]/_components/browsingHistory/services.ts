"use server";

import {
  countBrowsingHistory,
  createBrowsingHistory,
} from "@/repositories/browsingHistory";
import { getSessionUser } from "@/utils";

/**
 * 商品閲覧履歴を追加する
 * Sessionが切れているなどでログインしていない場合はユーザーなしで追加する
 * @param itemId 商品ID
 * @returns 追加された閲覧履歴
 */
export const browsing = async (itemId: string) => {
  const sessionUser = await getSessionUser();
  return await createBrowsingHistory(itemId, sessionUser?.id);
};

/**
 * 閲覧数を取得する
 * @param itemId 商品ID
 * @returns
 */
export const getViewCount = async (itemId: string) => {
  const sessionUser = await getSessionUser();
  return await countBrowsingHistory(itemId, sessionUser?.id);
}
