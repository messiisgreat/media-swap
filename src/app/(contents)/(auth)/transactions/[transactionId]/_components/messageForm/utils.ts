import { createRecipientMailContent } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/messageForm/mailTemplate";
import {
  NOTIFICATION_KEYS,
  NOTIFICATION_TYPES,
} from "@/constants/emailNotification";
import { sendMailToUser } from "@/lib/mail";
import { type TransactionCommentCreateResult } from "@/repositories/transactionComment";
import { decimalToBinary } from "@/utils/converter";

/**
 * 取引メッセージが送信された際に、相手にメールを送信する
 * @param transactionComment 取引コメント
 */
export const sendMailToRecipient = async (
  transactionComment: TransactionCommentCreateResult,
): Promise<boolean> => {
  const { transaction, transactionId, userId, comment } = transactionComment;
  const { item } = transaction;
  const { name: itemName, sellerId, seller } = item;
  const {
    name: sellerName,
    email: sellerEmail,
    noticePermissionCode: sellerNotificationSettings,
  } = seller;
  const {
    name: buyerName,
    email: buyerEmail,
    noticePermissionCode: buyerNotificationSettings,
  } = transaction.buyer;

  // メッセージを受け取ったユーザーを定義する
  const recipientEmail = sellerId === userId ? buyerEmail : sellerEmail;
  const recipientName = sellerId === userId ? buyerName : sellerName;

  // メッセージを受け取ったユーザーの通知設定を定義する
  const recipientNotificationSettings =
    sellerId === userId
      ? buyerNotificationSettings
      : sellerNotificationSettings;

  const numberOfKeys = Object.keys(NOTIFICATION_TYPES).length;

  const recipientNoticePermissionCode = decimalToBinary(
    recipientNotificationSettings,
    numberOfKeys,
  );

  const transactionMessageNotificationIndex = NOTIFICATION_KEYS.indexOf(
    "transactionMessageNotification",
  );

  // transactionMessage の boolean 値を取得
  const recipientWantsTransactionMessage =
    recipientNoticePermissionCode[transactionMessageNotificationIndex];

  const mailSubject = `取引中の商品:${itemName} にてメッセージが届きました`;

  const mailContent = createRecipientMailContent(
    recipientName,
    itemName,
    transactionId,
    comment,
  );

  if (recipientWantsTransactionMessage) {
    return await sendMailToUser(recipientEmail, mailSubject, mailContent);
  }
  return true;
};
