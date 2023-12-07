"use server";

import {
  TrackingNumberFormScheme,
  TrackingNumberFormState,
} from "@/app/transactions/[transactionId]/type";
import {
  createTransactionComment,
  getTransactionComments,
  markAsReadTransactionComments,
  updateTransaction,
  updateTransactionStatus,
} from "@/repositories/transaction";
import { getFormValues } from "@/ui/form";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getSessionUser } from "@/utils";

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
export const sendMessage = async (message: string, transactionId: string) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) throw new Error("ログインしてください");
  if (message.length > 300)
    throw new Error("メッセージは300文字以内で入力してください");
  await createTransactionComment(message, sessionUser.id, transactionId);
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

  const [isVerify, message] = await verifyForm(verificationCode);

  if (!isVerify) {
    return {
      ...prevState,
      message: message,
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
