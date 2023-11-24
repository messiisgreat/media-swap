import { FormState } from "@/components/form";
import { z } from "zod";

type InquiryFormValues = {
  name: string;
  email: string;
  category: string;
  body: string;
};

/** お問い合わせフォームの状態とバリデーション、メッセージを表す型 */
export type InquiryFormState = FormState<InquiryFormValues>;

/** お問い合わせフォームの初期値 */
export const initialInquiryFormValues: InquiryFormState = {
  values: {
    name: "",
    email: "",
    category: "",
    body: "",
  },
  errors: {},
  message: "",
};

/** お問い合わせフォームのバリデーション */
export const InquiryFormSchema = z.object({
  name: z.string().min(1, { message: "名前は必須です" }),
  email: z.string().email({ message: "メールアドレスが不正です" }),
  category: z.string().min(1, { message: "カテゴリーは必須です" }),
  body: z.string().min(1, { message: "本文は必須です" }),
});

/** お問い合わせフォームのカテゴリー選択肢 */
export const categoryOptions = [
  { label: "ご意見", value: "ご意見" },
  { label: "ご感想", value: "ご感想" },
  { label: "その他", value: "その他" },
];
