import { FormState } from "@/components/form";
import { ZodType, z } from "zod";

export type PersonalInfoFormValues = {
  /** 名前 */
  name: string;
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

/** お問い合わせフォームの状態とバリデーション、メッセージを表す型 */
export type PersonalInfoFormState = FormState<PersonalInfoFormValues>;

/** お問い合わせフォームの初期値 */
export const initialPersonalInfoFormValues: PersonalInfoFormState = {
  values: {
    name: "",
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

/** お問い合わせフォームのバリデーション */
export const PersonalInfoFormSchema: ZodType<PersonalInfoFormValues> = z.object(
  {
    name: z.string().min(1, { message: "お名前を入力してください" }),
    postalCode: z.string().min(1, { message: "郵便番号を入力してください" }),
    prefecture: z.string().min(1, { message: "都道府県を入力してください" }),
    city: z.string().min(1, { message: "市区町村を入力してください" }),
    addressLine1: z.string().min(1, { message: "住所1を入力してください" }),
    addressLine2: z.string().min(1, { message: "住所2を入力してください" }),
    phoneNumber: z.string().min(1, { message: "電話番号を入力してください" }),
  },
);
