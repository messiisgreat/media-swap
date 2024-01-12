"use server";

import {
  ProfileFormSchema,
  type ProfileFormState,
} from "@/app/(contents)/(auth)/mypage/settings/profile/type";
import { PAGE_CONTENT, PAGE_LINK } from "@/constants/myPage";
import { uploadToCloudinary } from "@/lib/cloudinary/upload";
import { updateUser } from "@/repositories/user";
import { getFormValues } from "@/ui/form";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

/**
 * 画像のアップロード
 * 画像の変更していない場合はFileのsizeが0になるため、undefinedを返すようにしています
 * @param image - 画像のURL一覧が含まれたオブジェクトの配列
 * @returns アップロードした画像データ or undefined
 */
const uploadImage = async (image: File | null) => {
  if (!image) return undefined;
  if (image.size === 0) return undefined;

  const [uploadImage] = await uploadToCloudinary([image]);
  return uploadImage;
};

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
  const { verificationCode, image, ...rest } = values;
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.id;
  if (!userId) {
    redirect(`api/auth/login?callbackUrl=${PAGE_LINK[PAGE_CONTENT.PROFILE]}`);
  }

  const result = await verifyForm(verificationCode);
  if (result.isFailure) {
    return {
      ...prevState,
      message: result.error,
    };
  }
  const uploadedImage = await uploadImage(image);
  const validated = ProfileFormSchema.safeParse({
    ...values,
    image: uploadedImage,
  });
  if (!validated.success) {
    return {
      ...prevState,
      errors: validated.error.flatten().fieldErrors,
    };
  }
  if (rest.email) {
    await updateUser({
      ...rest,
      id: userId,
      image: uploadedImage,
    });
  }

  redirect(PAGE_LINK[PAGE_CONTENT.SETTINGS]);
};
