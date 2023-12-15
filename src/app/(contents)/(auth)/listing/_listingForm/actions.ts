"use server";

import { redirect } from "next/navigation";

import {
  ProductFormSchema,
  type ProductFormState,
  type ProductFormValues,
} from "@/features/itemsFormContents/types";
import { uploadToCloudinary } from "@/lib/cloudinary/upload";
import { createItem, type ItemCreateInput } from "@/repositories/item";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getFormValues } from "@/ui/form/utils";
import { getSession, strToBool } from "@/utils";

const create = async (
  formData: Omit<ProductFormValues, "verificationCode">,
  userId: string,
  previousPrice: number | null = null,
) => {
  const {
    tags,
    imageFiles,
    isPublic,
    isShippingIncluded,
    shippingMethodCustom,
    price,
    ...rest
  } = formData;
  const item: ItemCreateInput = {
    previousPrice,
    isPublic: strToBool(isPublic),
    isShippingIncluded: strToBool(isShippingIncluded),
    shippingMethodCustom: shippingMethodCustom ?? null,
    price: Number(price),
    ...rest,
  };
  const images = await uploadToCloudinary(imageFiles);
  const tagTexts = tags.split(",");
  return createItem(userId, item, images, tagTexts);
};

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
  const session = await getSession();
  const userId = session?.user.id;
  const { verificationCode, ...rest } = values;
  // 文字列の'isPublic'をブール値に変換
  const isPublicBool = strToBool(values.isPublic);

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

  if (!isPublicBool) {
    await create(rest, userId, previousPrice);
    redirect(`/mypage/draft`);
  } else {
    const validated = ProductFormSchema.safeParse(values);
    console.log("value", values);
    if (!validated.success) {
      return {
        ...prevState,
        errors: validated.error.flatten().fieldErrors,
      };
    }
    const item = await create(rest, userId, previousPrice);
    redirect(`/listing/complete?item_id=${item.id}&is_public=true`);
  }
};
