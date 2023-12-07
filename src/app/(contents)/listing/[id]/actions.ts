"use server";

import { Prisma } from "@prisma/client";

import {
  createBuyerMailContent,
  createSellerMailContent,
} from "@/app/(contents)/listing/[id]/mailTemplate";
import { SITE_NAME } from "@/constants/site";
import { sendMailToUser } from "@/lib/mail";
import {
  createListingReport,
  deleteListing,
  findListingById,
} from "@/repositories/listing";
import {
  createComment,
  createCommentReport,
  deleteListingComment,
  getComments,
} from "@/repositories/listingComment";
import { createTransaction } from "@/repositories/transaction";
import { fetchVerifyResult } from "@/ui/form/securityVerifier/fetcher";
import { getSessionUser } from "@/utils";
import { Result, failure, success } from "@/utils/result";

type PurchasingResult = Result<string, string>;

/**
 * 購入ボタンを押したときのサーバー側処理
 * @param listingId - 購入対象の出品ID
 * @param userCouponId - 購入対象のクーポンID
 * @returns 購入処理の結果 {ok: true, value: 取引ID} | {ok: false, error: エラーメッセージ}
 */
export const purchasing = async (
  listingId: string,
  userCouponId: string | null,
): Promise<PurchasingResult> => {
  const buyer = await getSessionUser();
  if (buyer === undefined) {
    return failure("ログインしてください");
  }
  const transaction = await createTransaction(
    listingId,
    buyer.id,
    userCouponId,
  );
  const { sellerResult, buyerResult } =
    await sendMailToBuyerAndSeller(transaction);
  if (!sellerResult) {
    return failure("出品者へのメール送信に失敗しました");
  }
  if (!buyerResult) {
    return failure("購入者へのメール送信に失敗しました");
  }
  return success(transaction.id);
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
 * @param transaction 取引情報
 * @returns メール送信結果 {出品者, 購入者}
 */
export const sendMailToBuyerAndSeller = async (
  transaction: Prisma.PromiseReturnType<typeof createTransaction>,
) => {
  const listing = transaction.listing;
  const listingName = listing.productName!;
  const listingPrice = listing.price!;
  const sellerName = listing.seller.name;
  const buyerName = transaction.buyer.name;
  const sellerEmail = listing.seller.email;
  const buyerEmail = transaction.buyer.email;

  if (sellerName === null || buyerName === null) {
    return { sellerResult: false, buyerResult: false };
  }
  const sellerSubject = `【${SITE_NAME}】商品が購入されました。発送手続きをお願いします。`;
  const buyerSubject = `【${SITE_NAME}】購入確定のお知らせ：${listingName}`;

  const sellerText = createSellerMailContent(
    sellerName,
    listingName,
    SITE_NAME,
  );
  const buyerText = createBuyerMailContent(
    buyerName,
    listingName,
    listingPrice,
    sellerName,
    SITE_NAME,
  );

  const [sellerResult, buyerResult] = await Promise.all([
    sendMailToUser(sellerEmail, sellerSubject, sellerText),
    sendMailToUser(buyerEmail, buyerSubject, buyerText),
  ]);
  return { sellerResult, buyerResult };
};
