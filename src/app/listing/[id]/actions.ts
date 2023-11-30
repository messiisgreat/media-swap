"use server";

import { fetchVerifyResult } from "@/components/form/securityVerifier/fetcher";
import { sendMailToUser } from "@/lib/mail";
import {
  createListingReport,
  deleteListing,
  findListingById,
  updateListingTransactionId,
} from "@/services/listing";
import {
  createComment,
  createCommentReport,
  deleteListingComment,
  getComments,
} from "@/services/listingComment";
import { createTransaction } from "@/services/transaction";
import { findUserById } from "@/services/user";
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
export const addComment = async (text: string, listingId: string) => {
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
 * @returns
 */
export const removeComment = async (commentId: string) => {
  const user = await getSessionUser();
  if (!user) throw new Error("ログインしてください");
  const userId = user.id;
  return await deleteListingComment(commentId, userId);
};

/**
 * 商品の通報
 * @param listingId 商品ID
 * @param reason 通報理由
 * @param verificationCode reCAPTCHA認証コード
 * @returns
 */
export const addListingReport = async (
  listingId: string,
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
  return await createListingReport(listingId, userId, reason);
};

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
};

/**
 * 商品が購入された際に出品者と購入者にメールを送信する
 * @param listingId 商品ID
 */
export const sendMailToBuyerAndSeller = async (listingId: string) => {
  const listing = await findListingById(listingId);
  const buyer = await getSessionUser();
  if (!buyer) throw new Error("ログインしてください");
  // TODO: sellerはsellerIdに紐づいたUserオブジェクトを取得する
  const sellerId = listing.sellerId;
  const seller = await findUserById(sellerId);
  if (!seller) throw new Error("出品者が見つかりませんでした");
  const subject = "【フリマアプリ】商品が購入されました";
  const text = `${buyer.name}様
  この度はフリマアプリをご利用いただき、誠にありがとうございます。
  以下の商品が購入されました。

  商品名: ${listing.productName}
  金額: ${listing.price}円

  取引の詳細はマイページからご確認ください。

  ※このメールに心当たりのない場合は、お手数ですがフリマアプリまでご連絡ください。
  `;
  const sellerText = `${seller}様
  この度はフリマアプリをご利用いただき、誠にありがとうございます。
  以下の商品が購入されました。

  商品名: ${listing.productName}
  金額: ${listing.price}円
  取引ID: ${listing.transactionId}

  取引の詳細はマイページからご確認ください。

  ※このメールに心当たりのない場合は、お手数ですがフリマアプリまでご連絡ください。
  `;
  // TODO: sessionから取得したユーザーのメールアドレスを取得する
  if (typeof buyer.email === "string") {
    await sendMailToUser(buyer.email, subject, text);
  }
  await sendMailToUser(seller.email, subject, sellerText);
};
