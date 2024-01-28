"use server";

import {
  TransactionMessageSchema,
  type TransactionMessageFormState,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/messageForm/types";
import { sendMailToRecipient } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/messageForm/utils";
import { createTransactionComment } from "@/repositories/transactionComment";
import { getFormValues } from "@/ui/form";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getSessionUser } from "@/utils";
import { revalidatePath } from "next/cache";

/**
 * メッセージフォームsubmit時の処理
 * @param prevState 前の状態
 * @param formData FormData
 */
export const messageFormAction = async (
  prevState: TransactionMessageFormState,
  formData: FormData,
): Promise<TransactionMessageFormState> => {
  const values = getFormValues(formData, prevState.values);
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.id;
  const { message, transactionId, verificationCode } = values;
  if (!userId) {
    return {
      ...prevState,
      toast: {
        message: "セッションが切れました。再度ログインしてください。",
        type: "error",
      },
    };
  }

  const result = await verifyForm(verificationCode);
  if (result.isFailure) {
    return {
      ...prevState,
      toast: {
        message: result.error,
        type: "error",
      },
    };
  }

  const validated = TransactionMessageSchema.safeParse(values);
  if (!validated.success) {
    const message = validated.error.errors[0]?.message;
    return {
      ...prevState,
      toast: message ? { message, type: "error" } : undefined,
    };
  }

  try {
    const transactionComment = await createTransactionComment(
      message,
      userId,
      transactionId,
    );
    await sendMailToRecipient(transactionComment);
    revalidatePath(`/transactions/${transactionId}`);
    return {
      ...prevState,
      toast: {
        message: "メッセージを送信しました",
        type: "success",
      },
    };
  } catch (error) {
    return {
      ...prevState,
      toast: {
        message: "メッセージの送信に失敗しました",
        type: "error",
      },
    };
  }
};
