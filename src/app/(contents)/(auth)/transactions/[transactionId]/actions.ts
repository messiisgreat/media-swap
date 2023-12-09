"use server";

import {
  TrackingNumberFormScheme,
  type TrackingNumberFormState,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/type";
import { failure, success, type Result } from "@/lib/result/result";
import {
  updateTransaction,
  updateTransactionStatus,
} from "@/repositories/transaction";
import { getFormValues } from "@/ui/form";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getSessionUser } from "@/utils";

import { createRecipientMailContent } from "@/app/(contents)/listing/[id]/mailTemplate";
import { sendMailToUser } from "@/lib/mail";
import {
  createTransactionComment,
  getTransactionComments,
  markAsReadTransactionComments,
} from "@/repositories/transactionComment";

type SendMessageResult = Result<string, string>;

/**
 * 取引メッセージを取得
 * @param transactionId 取引ID
 * @returns
 */
export const fetchMessages = async (transactionId: string) => {
  const user = await getSessionUser();
  if (!user) throw new Error("ログインしてください");
  const userId = user.id;
  const [comments] = await Promise.all([
    getTransactionComments(transactionId),
    markAsReadTransactionComments(transactionId, userId),
  ]);
  return comments;
};

/**
 * トランザクションのステータスを更新する
 *
 * @param id - トランザクションの取引ID
 * @param stateId - 設定する新しい状態ID
 */
export const updateTransactionStateByTransactionId = async (
  id: string,
  stateId: number,
) => {
  await updateTransactionStatus({
    id,
    transactionStatus: stateId,
  });
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
): Promise<SendMessageResult> => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return failure("ログインしてください");
  if (message.length > 300)
    return failure("メッセージは300文字以内で入力してください");
  const transactionComment = await createTransactionComment(
    message,
    sessionUser.id,
    transactionId,
  );
  await sendMailToRecipient(transactionComment);
  return success("メッセージを送信しました");
};

/**
 * 取引メッセージが送信された際に、相手にメールを送信する
 * @param transactionComment 取引コメント
 */
const sendMailToRecipient = async (
  transactionComment: Awaited<ReturnType<typeof createTransactionComment>>,
) => {
  const transaction = transactionComment.transaction;
  if (!transaction) throw new Error("取引が見つかりません");
  const transactionId = transactionComment.transactionId;
  const listingName = transaction.listing.productName;
  const sellerId = transaction.listing.sellerId;
  const sellerName = transaction.listing.seller.name;
  const buyerName = transaction.buyer.name;
  const sellerEmail = transaction.listing.seller.email;
  const buyerEmail = transaction.buyer.email;
  const transactionCommentUserId = transactionComment.userId;
  const transactionCommentCreateComment = transactionComment.comment;

  // メッセージを受け取ったユーザーを定義する
  const recipientEmail =
    sellerId === transactionCommentUserId ? buyerEmail : sellerEmail;
  const recipientName =
    sellerId === transactionCommentUserId ? buyerName : sellerName;

  const mailSubject = `取引中の商品:${listingName} にてメッセージが届きました`;

  const mailContent = createRecipientMailContent(
    recipientName,
    listingName,
    transactionId,
    transactionCommentCreateComment,
  );
  await sendMailToUser(recipientEmail, mailSubject, mailContent);
};

/**
 * 追跡番号を登録
 * @param prevState 前の状態
 * @param formData FormData
 */
export const insertTrackingNumber = async (
  prevState: TrackingNumberFormState,
  formData: FormData,
): Promise<TrackingNumberFormState> => {
  const values = getFormValues(formData, prevState.values);
  const { verificationCode, trackingNumber, transactionId } = values;

  const result = await verifyForm(verificationCode);

  if (result.isFailure) {
    return {
      ...prevState,
      message: result.error,
    };
  } else {
    const validated = TrackingNumberFormScheme.safeParse(values);

    if (!validated.success) {
      return {
        ...prevState,
        errors: validated.error.flatten().fieldErrors,
      };
    }
    try {
      await updateTransaction({
        id: transactionId,
        trackingNumber: trackingNumber,
      });
      return {
        ...prevState,
        errors: {},
        values: {
          ...prevState.values,
          trackingNumber: trackingNumber,
        },
      };
    } catch {
      return {
        ...prevState,
        message: "送り状番号の更新に失敗しました",
      };
    }
  }
};
