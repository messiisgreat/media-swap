"use server";

import { createRecipientMailContent } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/messageSection/mailTemplate";
import {
  NOTIFICATION_KEYS,
  NOTIFICATION_TYPES,
} from "@/constants/emailNotification";
import { sendMailToUser } from "@/lib/mail";
import { failure, success, type Result } from "@/lib/result";
import {
  createTransactionComment,
  findTransactionComments,
  markAsReadTransactionComments,
  type TransactionCommentCreateResult,
} from "@/repositories/transactionComment";
import { getSessionUser } from "@/utils";
import { decimalToBinary } from "@/utils/converter";

/**
 * 取引メッセージを取得
 * @param transactionId 取引ID
 * @returns
 */
export const fetchMessages = async (transactionId: string) => {
  const user = await getSessionUser();
  if (!user)
    return failure("セッションが切れました。再度ログインしてください。");
  const userId = user.id;
  const [comments] = await Promise.all([
    findTransactionComments(transactionId),
    markAsReadTransactionComments(transactionId, userId),
  ]);
  return success(comments);
};

/**
 * メッセージを送信
 * @param message メッセージ
 * @param transactionId 取引ID
 * @returns
 */
export const sendMessage = async (
  message: string,
  transactionId: string,
): Promise<Result<string, string>> => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return failure("ログインしてください");
  if (message.length > 300)
    return failure("メッセージは300文字以内で入力してください");
  const transactionComment = await createTransactionComment(
    message,
    sessionUser.id,
    transactionId,
  );

  const result = await sendMailToRecipient(transactionComment);
  if (!result) return failure("メールの送信に失敗しました");
  return success("メッセージを送信しました");
};

/**
 * 取引メッセージが送信された際に、相手にメールを送信する
 * @param transactionComment 取引コメント
 */
const sendMailToRecipient = async (
  transactionComment: TransactionCommentCreateResult,
): Promise<boolean> => {
  const transaction = transactionComment.transaction;
  if (!transaction) return false;
  const transactionId = transactionComment.transactionId;
  const itemName = transaction.item.name;
  const sellerId = transaction.item.sellerId;
  const sellerName = transaction.item.seller.name;
  const buyerName = transaction.buyer.name;
  const sellerEmail = transaction.item.seller.email;
  const buyerEmail = transaction.buyer.email;
  const transactionCommentUserId = transactionComment.userId;
  const transactionCommentCreateComment = transactionComment.comment;
  const buyerNotificationSettings = transaction.buyer.noticePermissionCode;
  const sellerNotificationSettings =
    transaction.item.seller.noticePermissionCode;

  // メッセージを受け取ったユーザーを定義する
  const recipientEmail =
    sellerId === transactionCommentUserId ? buyerEmail : sellerEmail;
  const recipientName =
    sellerId === transactionCommentUserId ? buyerName : sellerName;

  // メッセージを受け取ったユーザーの通知設定を定義する
  const recipientNotificationSettings =
    sellerId === transactionCommentUserId
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
    transactionCommentCreateComment,
  );

  if (recipientWantsTransactionMessage) {
    return await sendMailToUser(recipientEmail, mailSubject, mailContent);
  }
  return true;
};
