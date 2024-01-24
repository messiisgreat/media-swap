"use server";

import {
  createBuyerMailContent,
  createSellerMailContent,
} from "@/app/(contents)/item/[itemId]/_components/transactionButton/purchaseButton/mailTemplate";
import { SITE_NAME } from "@/constants/site";
import { isNotificationDesired } from "@/features/notificationPermit/utils";
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
 * @param itemId - 購入対象の出品ID
 * @param userCouponId - 購入対象のクーポンID
 * @returns 購入処理の結果 {ok: true, value: 取引ID} | {ok: false, error: エラーメッセージ}
 */
export const purchasing = async (
  itemId: string,
  userCouponId: string | null,
): Promise<PurchasingResult> => {
  const buyer = await getSessionUser();
  if (buyer === undefined) {
    return failure("ログインしてください");
  }
  const transaction = await createTransaction(itemId, buyer.id, userCouponId);
  const { sellerResult, buyerResult } =
    await sendMailToBuyerAndSeller(transaction);
  if (!sellerResult) {
    return failure("出品者へのメール送信に失敗しました");
  }
  if (!buyerResult) {
    return failure("購入者へのメール送信に失敗しました");
  }
  revalidatePath(`/item/${itemId}`);
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
  const { name: itemName, price: itemPrice, seller } = transaction.item;
  const {
    name: sellerName,
    email: sellerEmail,
    noticePermissionCode: sellerNoticeCode,
  } = seller;
  const {
    name: buyerName,
    email: buyerEmail,
    noticePermissionCode: buyerNoticeCode,
  } = transaction.buyer;

  if (sellerName === null || buyerName === null) {
    return { sellerResult: false, buyerResult: false };
  }
  const sellerSubject = `【${SITE_NAME}】商品が購入されました。発送手続きをお願いします。`;
  const buyerSubject = `【${SITE_NAME}】購入確定のお知らせ：${itemName}`;

  const sellerText = createSellerMailContent(sellerName, itemName, SITE_NAME);
  const buyerText = createBuyerMailContent(
    buyerName,
    itemName,
    itemPrice,
    sellerName,
    SITE_NAME,
  );

  const [sellerNotificationDesired, buyerNotificationDesired] = [
    isNotificationDesired(sellerNoticeCode, "purchaseNotification"),
    isNotificationDesired(buyerNoticeCode, "purchaseNotification"),
  ];

  const sellerResult = sellerNotificationDesired
    ? await sendMailToUser(sellerEmail, sellerSubject, sellerText)
    : true;
  const buyerResult = buyerNotificationDesired
    ? await sendMailToUser(buyerEmail, buyerSubject, buyerText)
    : true;
  return { sellerResult, buyerResult };
};
