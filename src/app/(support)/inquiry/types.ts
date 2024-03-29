import { z, type ZodType } from "zod";

import {
  DEFAULT_INPUT_MAX_LENGTH,
  DEFAULT_TEXTAREA_MAX_LENGTH,
} from "@/constants/maxLength";
import { type FormState } from "@/ui/form";

type InquiryFormValues = {
  name: string;
  email: string;
  category: string;
  body: string;
};

/** お問い合わせフォームの状態とバリデーション、メッセージを表す型 */
export type InquiryFormState = FormState<InquiryFormValues>;

/** お問い合わせフォームの初期値 */
export const initialInquiryFormValues = {
  values: {
    name: "",
    email: "",
    category: "",
    body: "",
    verificationCode: "",
  },
} as const satisfies InquiryFormState;

/** お問い合わせフォームのバリデーション */
export const InquiryFormSchema: ZodType<InquiryFormValues> = z.object({
  name: z
    .string()
    .min(1, { message: "お名前を入力してください" })
    .max(DEFAULT_INPUT_MAX_LENGTH, {
      message: `お名前は${DEFAULT_INPUT_MAX_LENGTH}文字以内で入力してください`,
    }),
  email: z.string().email({ message: "メールアドレスが不正です" }),
  category: z
    .string()
    .min(1, { message: "お問い合わせ種別を選択してください" }),
  body: z
    .string()
    .min(1, { message: "お問い合わせ内容は必須です" })
    .max(DEFAULT_TEXTAREA_MAX_LENGTH, {
      message: `お名前は${DEFAULT_TEXTAREA_MAX_LENGTH}文字以内で入力してください`,
    }),
});

/** お問い合わせフォームのカテゴリー選択肢 */
export const categoryOptions = {
  1: "ご質問",
  2: "ご意見",
  3: "ご感想",
  4: "その他",
} as const;
