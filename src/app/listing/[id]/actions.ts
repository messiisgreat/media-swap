"use server";

import { fetchVerifyResult } from "@/components/form/securityVerifier/fetcher";
import {
  createComment,
  createCommentReport,
  deleteListingComment,
  getComments,
} from "@/services/listingComment";
import { createTransaction } from "@/services/transaction";
import { Session } from "next-auth";
import { updateListingTransactionId } from "@/services/listing";

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
  const transaction = await createTransaction(listingId, buyerId, userCouponId);
  const transactionId = transaction.id;
  await updateListingTransactionId({ id: listingId }, transactionId);
  return transactionId;
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
 * @param userId 通報ユーザーID
 * @param reason 通報理由
 * @param verificationCode reCAPTCHA v3で取得した値
 * @returns
 */
export const addCommentReport = async (
  commentId: string,
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
