import { type ZodType, z } from "zod";

import { type FormState } from "@/ui/form";

type InCancellationFormValues = {
  name: string;
  email: string;
  category: string;
  body: string;
};

export type CancellationInquiryFormState = FormState<InCancellationFormValues>;

export const initialCancellationFormValues = {
  values: {
    name: "maeda yuki",
    email: "y.maeda@valour-tec.com",
    category: "",
    body: "",
    verificationCode: "",
  },
  errors: {},
  message: "",
};

export const cancellationInquiryFormSchema: ZodType<InCancellationFormValues> = z.object({
  name: z.string().min(1, { message: "お名前を入力してください" }),
  email: z.string().email({ message: "メールアドレスが不正です" }),
  category: z.string().min(1, { message: "カテゴリーを選択してください" }),
  body: z.string().min(1, { message: "本文は必須です" }),
});

/** キャンセル理由(出品者) */
export const cancellationSellerReasons = {
  1: "その他",
} as const;

/** キャンセル理由(購入者) */
export const cancellationBuyerReasons = {
  1: "商品が発送されない。",
  2: "届いた商品が購入した商品とは異なる。",
  3: "その他",
} as const;