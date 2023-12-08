import { type ZodType, z } from "zod";

import { type FormState } from "@/ui/form";

export type AddressFormValues = {
  /** 名前 */
  // name: string;
  /** 郵便番号 */
  postalCode: string;
  /** 都道府県 */
  prefecture: string;
  /** 市区町村 */
  city: string;
  /** 住所1 */
  addressLine1: string;
  /** 住所2 */
  addressLine2: string;
  /** 電話番号 */
  phoneNumber: string;
};

/** 住所フォームの状態とバリデーション、メッセージを表す型 */
export type AddressFormState = FormState<AddressFormValues>;

/** 住所フォームの初期値 */
export const initialAddressFormValues: AddressFormState = {
  values: {
    // name: "",
    postalCode: "",
    prefecture: "",
    city: "",
    addressLine1: "",
    addressLine2: "",
    phoneNumber: "",
    verificationCode: "",
  },
  errors: {},
  message: "",
};

/** 住所フォームのバリデーション */
export const AddressFormSchema: ZodType<AddressFormValues> = z.object({
  // name: z.string().min(1, { message: "お名前を入力してください" }),
  postalCode: z.string().min(1, { message: "郵便番号を入力してください" }),
  prefecture: z.string().min(1, { message: "都道府県を入力してください" }),
  city: z.string().min(1, { message: "市区町村を入力してください" }),
  addressLine1: z.string().min(1, { message: "住所1を入力してください" }),
  addressLine2: z.string(),
  phoneNumber: z.string().min(1, { message: "電話番号を入力してください" }),
  verificationCode: z
    .string({ required_error: "認証を行ってください" })
    .min(1, { message: "認証を行ってください" }),
});
