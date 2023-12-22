"use server";

import { subject, text } from "@/app/(support)/inquiry/mailConfig";
import {
  InquiryFormSchema,
  type InquiryFormState,
  initialInquiryFormValues,
} from "@/app/(support)/inquiry/types";
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
export const sendInquiry = async (
  prevState: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> => {
  const values = getFormValues(formData, prevState.values);
  const result = await verifyForm(values.verificationCode);

  if (result.isFailure) {
    return {
      ...prevState,
      message: result.error,
    };
  } else {
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
      await sendMailToUser(email, subject, text);
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
  }
};
