"use server";

import { type NoticeFormState } from "@/app/(contents)/(auth)/mypage/setting/notification-settings/type";
import { updateUser } from "@/repositories/user";
import { getFormValues } from "@/ui/form";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getSessionUser } from "@/utils";
import { binaryToDecimal } from "@/utils/converter";
import { redirect } from "next/navigation";

/**
 * 通知設定を登録する
 * 不備がある場合はエラーメッセージを含んだ状態を返す
 * @param prevState 前の状態
 * @param formData FormData
 */
export const profileUpdateAction = async (
  prevState: NoticeFormState,
  formData: FormData,
): Promise<NoticeFormState> => {
  const values = getFormValues(formData, prevState.values);
  const { verificationCode, ...rest } = values;

  const sessionUser = await getSessionUser();
  const userId = sessionUser?.id;
  if (!userId) {
    redirect("api/auth/login?callbackUrl=/mypage/notification-settings");
  }

  const result = await verifyForm(verificationCode);
  if (result.isFailure) {
    return {
      ...prevState,
      message: result.error,
    };
  }

  const noticePermissionCode = binaryToDecimal(Object.values(rest));

  try {
    await updateUser({
      id: userId,
      noticePermissionCode,
    });
    return {
      ...prevState,
      values: {
        ...rest,
        verificationCode: "",
      },
      message: "通知設定を更新しました",
    };
  } catch (error) {
    return {
      ...prevState,
      message: "通知設定の更新に失敗しました",
    };
  }
};
