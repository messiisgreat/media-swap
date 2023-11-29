"use server";

import { fetchVerifyResult } from "@/components/form/securityVerifier/fetcher";
import {
  createComment,
  createCommentReport,
  deleteListingComment,
  getComments,
} from "@/services/listingComment";
import { createTransaction } from "@/services/transaction";
import { updateListingTransactionId, createListingReport, deleteListing, findListingById } from "@/services/listing";
import { getSessionUser } from "@/utils";

/**
 * 購入ボタンを押したときのサーバー側処理
 * 取引を追加し、商品ページをrevalidateする
 * @param listingId - 購入対象の出品ID
 * @param userCouponId - 購入対象のクーポンID
 */
export const purchasing = async (
  listingId: string,
  userCouponId: string | null,
) => {
  const buyer = await getSessionUser();
  if (!buyer) throw new Error("ログインしてください");
  const buyerId = buyer.id;
  const transaction = await createTransaction(listingId, buyerId, userCouponId);
  const transactionId = transaction.id;
  await updateListingTransactionId({ id: listingId }, transactionId);
  return transactionId;
};

/**
 * コメントを書く
 * @param text コメント
 * @param listingId 商品ID
 */
export const addComment = async (
  text: string,
  listingId: string,
) => {
  if (text.length > 300)
    throw new Error("コメントは300文字以内で入力してください");
  const sessionUser = await getSessionUser();
  if (!sessionUser) throw new Error("ログインしてください");
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

/**
 * TODO: 検証用の取引作成ボタン！リリース時には削除
 * @param listingId 商品ID
 * @param buyerId 購入者ID
 * @returns 取引ID
 */
export const merchant = async (listingId: string, buyerId: string) => {
  const transaction = await createTransaction(listingId, buyerId);
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
 * @param userId 削除を行うユーザーID
 * @returns
 */
export const removeComment = async (commentId: string, userId: string) => {
  return await deleteListingComment(commentId, userId);
};

/**
 * 商品の通報
 * @param listingId 商品ID
 * @param userId 通報ユーザーID
 * @param reason 通報理由
 * @param verificationCode reCAPTCHA認証コード
 * @returns 
 */
export const addListingReport = async (
  listingId: string,
  userId: string,
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
  return await createListingReport(listingId, userId, reason);
}

/**
 * 商品の削除
 * @param listingId 商品ID
 * @returns 
 */
export const removeListing = async (listingId: string) => {
  const listing = await findListingById(listingId);
  const user = await getSessionUser();
  if (listing.sellerId !== user?.id) {
    throw new Error("商品の削除権限がありません");
  }
  return await deleteListing(listingId);
}