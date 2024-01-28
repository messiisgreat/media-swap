"use server";

import { redirect } from "next/navigation";

import {
  AddressFormSchema,
  type AddressFormState,
} from "@/app/(contents)/(auth)/mypage/settings/address/_components/addressForm/type";
import {
  ProductFormSchema,
  type ProductFormState,
} from "@/features/itemsFormContents/types";

import {
  createDraftItemWithTagsAndImages,
  createItemWithTagsAndImages,
} from "@/app/(contents)/(auth)/listing/_listingForm/utils";
import { PAGE_CONTENT, PAGE_LINK } from "@/constants/myPage";
import { upsertAddress } from "@/repositories/address";
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
      toast: {
        message: "セッションが切れました。再度ログインしてください。",
        type: "error",
      },
    };
  }

  const verifyResult = await verifyForm(verificationCode);
  if (verifyResult.isFailure) {
    return {
      ...prevState,
      toast: {
        message: verifyResult.error,
        type: "error",
      },
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
        toast: {
          message: "下書きの登録に失敗しました",
          type: "error",
        },
      };
    }

    redirect(PAGE_LINK[PAGE_CONTENT.DRAFTS]);
  } else {
    const validated = ProductFormSchema.safeParse(values);
    if (!validated.success) {
      const message = validated.error.errors[0]?.message;
      return {
        ...prevState,
        toast: message ? { message, type: "error" } : undefined,
      };
    }

    const itemResult = await createItemWithTagsAndImages(
      rest,
      userId,
      previousPrice,
    );

    if (itemResult.isFailure && !prevState.values.imageFiles.length) {
      return {
        ...prevState,
        toast: {
          message: "最低一枚画像を追加してください",
          type: "error",
        },
      };
    }

    if (itemResult.isFailure) {
      return {
        ...prevState,
        toast: {
          message: "商品の登録に失敗しました",
          type: "error",
        },
      };
    }

    redirect(`/listing/complete?item_id=${itemResult.value.id}&is_public=true`);
  }
};

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
  return {
    ...prevState,
    toast: {
      message: "住所を更新しました。",
      type: "success",
    },
  };
};
