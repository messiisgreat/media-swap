import { z, type ZodType } from "zod";

import {
  DEFAULT_INPUT_MAX_LENGTH,
  DEFAULT_TEXTAREA_MAX_LENGTH,
} from "@/constants/maxLength";
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
    name: "",
    email: "",
    category: "",
    body: "",
    verificationCode: "",
  },
  errors: {},
  message: "",
};

export const cancellationInquiryFormSchema: ZodType<InCancellationFormValues> =
  z.object({
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
        message: `お問い合わせ内容は${DEFAULT_TEXTAREA_MAX_LENGTH}文字以内で入力してください`,
      }),
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
