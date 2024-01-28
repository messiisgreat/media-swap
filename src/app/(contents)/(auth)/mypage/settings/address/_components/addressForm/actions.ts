"use server";

import {
  AddressFormSchema,
  type AddressFormState,
} from "@/app/(contents)/(auth)/mypage/settings/address/_components/addressForm/type";
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
      toast: {
        message: "セッションが切れました。再度ログインしてください。",
        type: "error",
      },
    };
  }

  const result = await verifyForm(verificationCode);
  if (result.isFailure) {
    return {
      ...prevState,
      toast: {
        message: result.error,
        type: "error",
      },
    };
  }

  const validated = AddressFormSchema.safeParse(values);
  if (!validated.success) {
    const message = validated.error.errors[0]?.message;
    return {
      ...prevState,
      toast: message ? { message, type: "error" } : undefined,
    };
  }
  const address = await upsertAddress(userId, rest);
  if (!address) {
    return {
      ...prevState,
      toast: {
        message: "住所の更新に失敗しました。時間をおいて再度お試しください。",
        type: "error",
      },
    };
  }
  redirect(PAGE_LINK[PAGE_CONTENT.SETTINGS]);
};
