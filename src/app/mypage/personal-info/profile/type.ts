import { ZodType, z } from "zod";

import { FormState } from "@/ui/form";

export type ProfileFormValues = {
  /** 名前 */
  // name: string;
  /** メールアドレス */
  email: string;
};

/** プロフィールフォームの状態とバリデーション、メッセージを表す型 */
export type ProfileFormState = FormState<ProfileFormValues>;

/** プロフィールフォームの初期値 */
export const initialProfileFormValues: ProfileFormState = {
  values: {
    // name: "",
    email: "",
    verificationCode: "",
  },
  errors: {},
  message: "",
};

/** プロフィールフォームのバリデーション */
export const ProfileFormSchema: ZodType<ProfileFormValues> = z.object({
  // name: z.string().min(1, { message: "お名前を入力してください" }),
  email: z.string().min(1, { message: "メールアドレスを入力してください" }),
  verificationCode: z
    .string({ required_error: "認証を行ってください" })
    .min(1, { message: "認証を行ってください" }),
});
