"use server";

import {
  cancellationInquiryFormSchema,
  initialCancellationFormValues,
  type CancellationInquiryFormState,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/sellerInfo/types";
import { subject, text } from "@/app/(support)/inquiry/mailConfig";
import { sendMailToAdmin, sendMailToUser } from "@/lib/mail";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getFormValues } from "@/ui/form/utils";

/**
 * フォームに入力されたお問い合わせ内容を送信する
 * 不備がある場合はエラーメッセージを含んだ状態を返す
 * 送信に成功した場合はフォームを空にし、メッセージを表示する
 * 送信に失敗した場合はエラーメッセージを表示する
 * @param prevState 前の状態
 * @param formData FormData
 */
export const sendCancelInquiry = async (
  prevState: CancellationInquiryFormState,
  formData: FormData,
): Promise<CancellationInquiryFormState> => {
  const values = getFormValues(formData, prevState.values);
  const result = await verifyForm(values.verificationCode);

  if (result.isFailure) {
    return {
      ...prevState,
      toast: {
        message: result.error,
        type: "error",
      },
    };
  } else {
    const validated = cancellationInquiryFormSchema.safeParse(values);
    if (!validated.success) {
      const message = validated.error.errors[0]?.message;
      return {
        ...prevState,
        toast: message ? { message, type: "error" } : undefined,
      };
    }
    const { name, email, category, body } = values;
    const inquiryBody = `${category} お問い合わせフォームからの連絡
  
    ${body}`;
    if (typeof name === "undefined" || typeof email === "undefined") {
      return {
        ...prevState,
        toast: {
          message: "名前とメールアドレスは必須です。",
          type: "error",
        },
      };
    }
    const result = await sendMailToAdmin(name, email, inquiryBody);
    if (result) {
      if (typeof email === "undefined") {
        return {
          ...prevState,
          toast: {
            message: "メールアドレスは必須です。",
            type: "error",
          },
        };
      }
      await sendMailToUser(email, subject, text);
      return {
        ...initialCancellationFormValues,
        toast: {
          message: "お問い合わせを受け付けました。",
          type: "success",
        },
      };
    } else {
      return {
        ...prevState,
        toast: {
          message: `お問い合わせの送信に失敗しました。
              時間をおいて再度お試しください。`,
          type: "error",
        },
      };
    }
  }
};
