"use server";

import {
  createBuyerMailContent,
  createSellerMailContent,
} from "@/app/(contents)/listing/[id]/_components/transactionButton/purchaseButton/mailTemplate";
import { SITE_NAME } from "@/constants/site";
import { sendMailToUser } from "@/lib/mail";
import { failure, success, type Result } from "@/lib/result";
import {
  createTransaction,
  type TransactionCreateResult,
} from "@/repositories/transaction";
import { getSessionUser } from "@/utils";
import { revalidatePath } from "next/cache";

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
  revalidatePath(`/listing/${listingId}`);
  return success(transaction.id);
};

/**
 * 商品が購入された際に出品者と購入者にメールを送信する
 * @param transaction 取引情報
 * @returns メール送信結果 {出品者, 購入者}
 */
const sendMailToBuyerAndSeller = async (
  transaction: TransactionCreateResult,
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
