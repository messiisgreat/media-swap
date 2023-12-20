"use server";

import {
  cancellationInquiryFormSchema,
  type CancellationInquiryFormState,
  initialCancellationFormValues,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/sellerInfo/types";
import { subject, text } from "@/app/(support)/inquiry/mailConfig";
import { sendMailToAdmin, sendMailToUser } from "@/lib/mail";
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
  console.log('------------------------------------');
  console.log(values);
  const validated = cancellationInquiryFormSchema.safeParse(values);
  if (!validated.success) {
    return {
      ...prevState,
      errors: validated.error.flatten().fieldErrors,
    };
  }
  const { name, email, category, body } = values;
  const inquiryBody = `${category} お問い合わせフォームからの連絡

  ${body}`;
  if (typeof name === "undefined" || typeof email === "undefined") {
    return {
      ...prevState,
      message: "名前とメールアドレスは必須です。",
    };
  }
  const result = await sendMailToAdmin(name, email, inquiryBody);
  if (result) {
    if (typeof email === "undefined") {
      return {
        ...prevState,
        message: "メールアドレスは必須です。",
      };
    }
    await sendMailToUser(email, subject, text);
    return {
      ...initialCancellationFormValues,
      message: "お問い合わせを受け付けました。",
    };
  } else {
    return {
      ...prevState,
      message: `お問い合わせの送信に失敗しました。
        時間をおいて再度お試しください。`,
    };
  }
};
