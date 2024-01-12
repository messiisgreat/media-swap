"use server";

import {
  AddressFormSchema,
  type AddressFormState,
} from "@/app/(contents)/(auth)/mypage/settings/address/type";
import { PAGE_CONTENT, PAGE_LINK } from "@/constants/myPage";
import { upsertAddress } from "@/repositories/address";
import { getFormValues } from "@/ui/form";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

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
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.id;
  const { verificationCode, ...rest } = values;

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

  const validated = AddressFormSchema.safeParse(values);
  if (!validated.success) {
    return {
      ...prevState,
      errors: validated.error.flatten().fieldErrors,
    };
  }
  const address = await upsertAddress({
    ...rest,
    userId,
  });
  if (!address) {
    return {
      ...prevState,
      message: "住所の更新に失敗しました。時間をおいて再度お試しください。",
    };
  }
  redirect(PAGE_LINK[PAGE_CONTENT.SETTINGS]);
};
