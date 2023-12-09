"use server";

import {
  ProfileFormSchema,
  type ProfileFormState,
} from "@/app/(contents)/(auth)/mypage/personal-info/profile/type";
import { updateEmail } from "@/repositories/user";
import { getFormValues } from "@/ui/form";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getSession } from "@/utils";

/**
 * フォームに入力されたプロフィール情報を登録する
 * 不備がある場合はエラーメッセージを含んだ状態を返す
 * @param prevState 前の状態
 * @param formData FormData
 */
export const profileFormAction = async (
  prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> => {
  const values = getFormValues(formData, prevState.values);
  const session = await getSession();
  const userId = session?.user.id;
  const { verificationCode, ...rest } = values;
  console.log("reset", rest);
  if (!userId) {
    return {
      ...prevState,
      message: "セッションが切れました。再度ログインしてください。",
    };
  }

  const result = await verifyForm(verificationCode);
  if (result.isFailure) {
    return {
      ...prevState,
      message: result.error,
    };
  }

  const validated = ProfileFormSchema.safeParse(values);
  if (!validated.success) {
    return {
      ...prevState,
      errors: validated.error.flatten().fieldErrors,
    };
  }
  if (rest.email) {
    await updateEmail(userId, rest.email);
  }

  return {
    ...prevState,
    message: "プロフィールを更新しました。",
  };
};
