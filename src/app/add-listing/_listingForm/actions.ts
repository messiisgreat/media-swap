"use server";

import {
  ProductFormSchema,
  ProductFormState,
  ProductFormValues,
} from "@/features/itemsFormContents/types";
import { uploadToCloudinary } from "@/lib/ImageUploadCloudinary";
import {
  UnregisteredListing,
  createListingWithTagsAndImages,
} from "@/repositories/listing";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getFormValues } from "@/ui/form/utils";
import { getSession, strToBool } from "@/utils";
import { redirect } from "next/navigation";

const create = async (
  formData: Omit<ProductFormValues, "verificationCode">,
  userId: string,
  previousPrice: number | null = null,
) => {
  const { tags, imageFiles, isPublic, postageIsIncluded, price, ...rest } =
    formData;
  const tagTexts = tags.split(",");
  const images = await uploadToCloudinary(imageFiles);
  const listing: UnregisteredListing = {
    previousPrice,
    sellerId: userId,
    isPublic: strToBool(isPublic),
    postageIsIncluded: strToBool(postageIsIncluded),
    price: Number(price),
    ...rest,
  };
  return createListingWithTagsAndImages(listing, tagTexts, images);
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

  const [isVerify, message] = await verifyForm(verificationCode);
  if (!isVerify) {
    return {
      ...prevState,
      message: message,
    };
  }

  if (!isPublicBool) {
    await create(rest, userId, previousPrice);
    redirect(`/mypage/draft`);
  } else {
    const validated = ProductFormSchema.safeParse(values);
    if (!validated.success) {
      return {
        ...prevState,
        errors: validated.error.flatten().fieldErrors,
        message: "入力に不備があります",
      };
    }
    const listing = await create(rest, userId, previousPrice);
    redirect(`/add-listing/complete?listing_id=${listing.id}&is_public=true`);
  }
};
