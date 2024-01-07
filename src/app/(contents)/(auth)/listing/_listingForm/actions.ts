"use server";

import { redirect } from "next/navigation";

import {
  ProductFormSchema,
  type ProductFormState,
} from "@/features/itemsFormContents/types";

import {
  createDraftItemWithTagsAndImages,
  createItemWithTagsAndImages,
} from "@/app/(contents)/(auth)/listing/_listingForm/utils";
import { PAGE_CONTENT, PAGE_LINK } from "@/constants/myPage";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getFormValues } from "@/ui/form/utils";
import { getSessionUser, strToBool } from "@/utils";

/**
 * フォームに入力された商品情報を登録し、完了後に確認ページにリダイレクトする
 * 不備がある場合はエラーメッセージを含んだ状態を返す
 * @param prevState 前の状態
 * @param formData FormData
 */
export const listingItem = async (
  prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> => {
  const values = getFormValues(formData, prevState.values);
  const previousPrice = null;
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.id;
  const { verificationCode, isPublic, ...rest } = values;
  const isPublicBool = strToBool(isPublic);

  if (!userId) {
    return {
      ...prevState,
      message: "セッションが切れました。再度ログインしてください。",
    };
  }

  const verifyResult = await verifyForm(verificationCode);
  if (verifyResult.isFailure) {
    return {
      ...prevState,
      message: verifyResult.error,
    };
  }

  if (!isPublicBool) {
    const draftResult = await createDraftItemWithTagsAndImages(
      rest,
      userId,
      previousPrice,
    );

    if (draftResult.isFailure) {
      return {
        ...prevState,
        message: "下書きの登録に失敗しました",
      };
    }

    redirect(PAGE_LINK[PAGE_CONTENT.DRAFTS]);
  } else {
    const validated = ProductFormSchema.safeParse(values);
    if (!validated.success) {
      return {
        ...prevState,
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const itemResult = await createItemWithTagsAndImages(
      rest,
      userId,
      previousPrice,
    );

    if (itemResult.isFailure) {
      return {
        ...prevState,
        message: "商品の登録に失敗しました",
      };
    }

    redirect(`/listing/complete?item_id=${itemResult.value.id}&is_public=true`);
  }
};
