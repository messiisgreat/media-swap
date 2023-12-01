"use server";

import { fetchVerifyResult } from "@/components/form/securityVerifier/fetcher";
import { CORPORATE_MAIL, SITE_NAME, SITE_URL } from "@/constants/site";
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
  const listingName = listing.productName;
  const buyer = await getSessionUser();
  if (!buyer) throw new Error("ログインしてください");
  const buyerName = buyer.name;
  const sellerId = listing.sellerId;
  const seller = await findUserById(sellerId);
  const sellerName = seller?.name;
  if (!seller) throw new Error("出品者が見つかりませんでした");
  const sellerSubject = `【${SITE_NAME}】商品が購入されました。発送手続きをお願いします。`;
  const sellerText = `${sellerName}様
  この度は${SITE_NAME}をご利用いただき、誠にありがとうございます。
  あなたの出品した商品 ${listingName} が購入されました。

  商品の発送準備をお願いします。
  発送が完了しましたら、発送完了の通知を当サービスを通じて購入者にお知らせください。
  購入者とのやり取りは取引ページをご利用ください。

  ※このメールに心当たりのない場合は、お手数ですが${CORPORATE_MAIL}までご連絡ください。

  ${SITE_URL}
  `;
  const buyerSubject = `【${SITE_NAME}】購入確定のお知らせ：${listingName}`;
  const buyerText = `${buyerName}様
  この度は${SITE_NAME}をご利用いただき、誠にありがとうございます。
  以下の商品を購入しました。

  商品名: ${listingName}
  金額: ${listing.price}円

  出品者の ${sellerName} 様が商品の発送準備を進めています。
  出品者とのやり取りは取引ページをご利用ください。

  ※このメールに心当たりのない場合は、お手数ですが${CORPORATE_MAIL}までご連絡ください。

  ${SITE_URL}
  `;
  if (typeof buyer.email === "string") {
    await sendMailToUser(buyer.email, buyerSubject, buyerText);
  }
  if (typeof seller.email === "string") {
    await sendMailToUser(seller.email, sellerSubject, sellerText);
  }
};
