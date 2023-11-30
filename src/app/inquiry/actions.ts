"use server";

import { subject, text } from "@/app/inquiry/mailConfig";
import {
  InquiryFormSchema,
  InquiryFormState,
  initialInquiryFormValues,
} from "@/app/inquiry/types";
import { getFormValues } from "@/components/form/utils";
import { sendMailToAdmin, sendMailToUser } from "@/lib/mail";

/**
 * フォームに入力されたお問い合わせ内容を送信する
 * 不備がある場合はエラーメッセージを含んだ状態を返す
 * 送信に成功した場合はフォームを空にし、メッセージを表示する
 * 送信に失敗した場合はエラーメッセージを表示する
 * @param prevState 前の状態
 * @param formData FormData
 */
export const sendInquiry = async (
  prevState: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> => {
  const values = getFormValues(formData, prevState.values);
  const validated = InquiryFormSchema.safeParse(values);
  if (!validated.success) {
    return {
      ...prevState,
      errors: validated.error.flatten().fieldErrors,
    };
  }
  const { name, email, category, body } = values;
  const inquiryBody = `${category} お問い合わせフォームからの連絡
  
  ${body}`;
  const result = await sendMailToAdmin(name, email, inquiryBody);
  if (result) {
    sendMailToUser(email, subject, text);
    return {
      ...initialInquiryFormValues,
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