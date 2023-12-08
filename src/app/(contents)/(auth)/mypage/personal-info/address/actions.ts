"use server";

import {
  AddressFormSchema,
  type AddressFormState,
} from "@/app/(contents)/(auth)/mypage/personal-info/address/type";
import { upsertAddress } from "@/repositories/address";
import { getFormValues } from "@/ui/form";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getSession } from "@/utils";

/**
 * フォームに入力された住所情報を登録する
 * 不備がある場合はエラーメッセージを含んだ状態を返す
 * @param prevState 前の状態
 * @param formData FormData
 */
export const addressFormAction = async (
  prevState: AddressFormState,
  formData: FormData,
): Promise<AddressFormState> => {
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

  const validated = AddressFormSchema.safeParse(values);
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
      message: "住所の更新に失敗しました。時間をおいて再度お試しください。",
    };
  }
  return {
    ...prevState,
    message: "住所設定を更新しました。",
  };
};
