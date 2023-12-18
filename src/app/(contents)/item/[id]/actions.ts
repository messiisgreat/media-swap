"use server";

import { createBrowsingHistory } from "@/repositories/browsingHistory";
import { deleteItem, findItemById } from "@/repositories/item";
import {
  createComment,
  createCommentReport,
  deleteItemComment,
  findComments,
} from "@/repositories/itemComment";
import { createItemReport } from "@/repositories/itemReport";
import { createTransaction } from "@/repositories/transaction";
import { fetchVerifyResult } from "@/ui/form/securityVerifier/fetcher";
import { getSessionUser } from "@/utils";

/**
 * コメントを書く
 * @param text コメント
 * @param itemId 商品ID
 */
export const addComment = async (text: string, itemId: string) => {
  if (text.length > 300)
    throw new Error("コメントは300文字以内で入力してください");
  const sessionUser = await getSessionUser();
  if (!sessionUser) throw new Error("ログインしてください");
  await createComment(text, sessionUser.id, itemId);
};

/**
 * コメントを取得
 * @param itemId 商品ID
 * @returns
 */
export const fetchComments = async (itemId: string) => {
  return await findComments(itemId);
};

/**
 * TODO: 検証用の取引作成ボタン！リリース時には削除
 * @param itemId 商品ID
 * @param buyerId 購入者ID
 * @returns 取引ID
 */
export const merchant = async (itemId: string, buyerId: string) => {
  const transaction = await createTransaction(itemId, buyerId);
  return transaction.id;
};

/**
 * コメントの通報
 * @param commentId コメントID
 * @param reason 通報理由
 * @param verificationCode reCAPTCHA v3で取得した値
 * @returns
 */
export const addCommentReport = async (
  commentId: string,
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
  if (!user) throw new Error("ログインしてください");
  const userId = user.id;
  return await createCommentReport(commentId, userId, reason);
};

/**
 * コメントを削除する
 * @param commentId コメントID
 * @returns
 */
export const removeComment = async (commentId: string) => {
  const user = await getSessionUser();
  if (!user) throw new Error("ログインしてください");
  const userId = user.id;
  return await deleteItemComment(commentId, userId);
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
  if (!user) throw new Error("ログインしてください");
  const userId = user.id;
  return await createItemReport(itemId, userId, reason);
};

/**
 * 商品の削除
 * @param itemId 商品ID
 * @returns
 */
export const removeItem = async (itemId: string) => {
  const item = await findItemById(itemId);
  const user = await getSessionUser();
  if (item.sellerId !== user?.id) {
    throw new Error("商品の削除権限がありません");
  }
  return await deleteItem(itemId);
};

/**
 * 商品ページを開けたときに商品閲覧履歴を追加する
 * @param itemId 商品ID
 * @param sessionUserId ユーザーID
 * @returns 追加された閲覧履歴
 */
export const browsing = async (itemId: string, sessionUserId: string) => {
  return await createBrowsingHistory(sessionUserId, itemId);
};