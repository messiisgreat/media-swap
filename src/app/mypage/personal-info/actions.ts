"use server";

import {
  PersonalInfoFormSchema,
  PersonalInfoFormState,
} from "@/app/mypage/personal-info/type";
import { getFormValues } from "@/components/form";
import { verifyForm } from "@/components/form/securityVerifier/verifyForm";
import { upsertAddress } from "@/services/address";
import { updateEmail } from "@/services/user";
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

  const [isVerify, message] = await verifyForm(verificationCode);
  if (!isVerify) {
    return {
      ...prevState,
      message: message,
    };
  }

  const validated = PersonalInfoFormSchema.safeParse(values);
  if (!validated.success) {
    return {
      ...prevState,
      errors: validated.error.flatten().fieldErrors,
    };
  }
  const address = await upsertAddress(
    userId,
    rest.postalCode,
    rest.prefecture,
    rest.city,
    rest.addressLine1,
    rest.addressLine2,
    rest.phoneNumber,
  );
  if (!address) {
    return {
      ...prevState,
      message: "住所の登録に失敗しました。時間をおいて再度お試しください。",
    };
  }
  if (rest.email) {
    await updateEmail(userId, rest.email);
  }
  return {
    ...prevState,
    message: "個人情報設定を更新しました。",
  };
};
