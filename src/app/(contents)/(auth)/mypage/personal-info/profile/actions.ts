"use server";

import {
  ProfileFormSchema,
  type ProfileFormState,
} from "@/app/(contents)/(auth)/mypage/personal-info/profile/type";
import { updateEmail } from "@/repositories/user";
import { getFormValues } from "@/ui/form";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

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
  const { verificationCode, ...rest } = values;
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.id;
  if (!userId) {
    redirect("api/auth/login?callbackUrl=/mypage/personal-info/profile");
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

  redirect("/mypage/");
};
