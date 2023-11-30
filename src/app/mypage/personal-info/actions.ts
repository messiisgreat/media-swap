"use server";

import {
  PersonalInfoFormSchema,
  PersonalInfoFormState,
} from "@/app/mypage/personal-info/type";
import { getFormValues } from "@/components/form";
import { verifyForm } from "@/components/form/securityVerifier/verifyForm";
import { createAddress } from "@/services/address";
import { getSession } from "@/utils";

/**
 * フォームに入力された住所情報を登録する
 * 不備がある場合はエラーメッセージを含んだ状態を返す
 * @param prevState 前の状態
 * @param formData FormData
 */
export const personalInfoFormAction = async (
  prevState: PersonalInfoFormState,
  formData: FormData,
): Promise<PersonalInfoFormState> => {
  const values = getFormValues(formData, prevState.values);
  const session = await getSession();
  const userId = session?.user.id;
  const { verificationCode, ...rest } = values;

  if (!userId) {
    return {
      ...prevState,
      message: "セッションが切れました。再度ログインしてください。",
    };
  }
  const verifyResult = await verifyForm(prevState, verificationCode);
  if (verifyResult) {
    return verifyResult;
  } else {
    const validated = PersonalInfoFormSchema.safeParse(values);
    if (!validated.success) {
      return {
        ...prevState,
        errors: validated.error.flatten().fieldErrors,
      };
    }
    const address = await createAddress({ ...rest, userId });
    if (!address) {
      return {
        ...prevState,
        message: "住所の登録に失敗しました。時間をおいて再度お試しください。",
      };
    }
    return {
      ...prevState,
      message: "住所を登録しました。",
    };
  }
};