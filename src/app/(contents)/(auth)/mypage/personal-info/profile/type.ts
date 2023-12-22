import { z, type ZodType } from "zod";

import { type FormState } from "@/ui/form";

export type ProfileFormValues = {
  /** 名前 */
  name: string;
  /** プロフィール画像 */
  image: File | null;
  /** メールアドレス */
  email: string;
  /** 自己紹介 */
  introduction: string;
};

/** プロフィールフォームの状態とバリデーション、メッセージを表す型 */
export type ProfileFormState = FormState<ProfileFormValues>;

/** プロフィールフォームの初期値 */
export const initialProfileFormValues = {
  values: {
    name: "",
    image: null,
    email: "",
    introduction: "",
    verificationCode: "",
  },
  errors: {},
  message: "",
} as const satisfies ProfileFormState;

/** プロフィールフォームのバリデーション */
export const ProfileFormSchema: ZodType<ProfileFormValues> = z.object({
  name: z.string().min(1, { message: "お名前を入力してください" }),
  image: z.custom<File>(),
  email: z.string().min(1, { message: "メールアドレスを入力してください" }),
  introduction: z
    .string()
    .min(1, { message: "自己紹介文を入力してください" })
    .max(2000, { message: "自己紹介文は2000字以内で入力してください" }),
  verificationCode: z
    .string({ required_error: "認証を行ってください" })
    .min(1, { message: "認証を行ってください" }),
});
