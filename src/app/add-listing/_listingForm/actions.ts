"use server";

import {
  ProductFormData,
  ProductFormSchema,
  ProductFormState,
} from "@/app/add-listing/_listingForm/types";
import { getFormValues } from "@/components/form/utils";
import { fetchVerifyResult } from "@/components/securityVerifier/fetcher";
import { uploadToCloudinary } from "@/lib/ImageUploadCloudinary";
import {
  UnregisteredListing,
  createListingWithTagsAndImages,
} from "@/services/listing";
import { getSession, strToBool } from "@/utils";
import { redirect } from "next/navigation";

const parseTags = (tagsString: string) => {
  if (!tagsString) return [];
  const tags: { id: string; text: string }[] = JSON.parse(tagsString);
  return tags.map((tag) => tag.text);
};

const create = async (
  formData: Omit<ProductFormData, "verificationCode">,
  userId: string,
  previousPrice: number | null = null,
) => {
  const { tags, imageFiles, isPublic, postageIsIncluded, ...rest } = formData;
  const tagTexts = parseTags(tags);
  const images = await uploadToCloudinary(imageFiles);
  const listing: UnregisteredListing = {
    previousPrice,
    sellerId: userId,
    isPublic: strToBool(isPublic),
    postageIsIncluded: strToBool(postageIsIncluded),
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
  if (!userId) {
    return {
      ...prevState,
      message: "セッションが切れました。再度ログインしてください。",
    };
  }
  if (!values.isPublic) {
    const listing = await create(rest, userId, previousPrice);
    redirect(`/add-listing/complete?listing_id=${listing.id}&is_public=false`);
  } else {
    const validated = ProductFormSchema.safeParse(values);
    if (!validated.success) {
      return {
        ...prevState,
        errors: validated.error.flatten().fieldErrors,
        message: "入力に不備があります",
      };
    }
    if (!verificationCode) {
      return {
        ...prevState,
        message: "認証を行ってください",
      };
    }
    const verifyResult = await fetchVerifyResult(verificationCode);
    if (!verifyResult) {
      return {
        ...prevState,
        message: "認証に失敗しました。再度認証を行ってください",
      };
    }
    const listing = await create(rest, userId, previousPrice);
    redirect(`/add-listing/complete?listing_id=${listing.id}&is_public=true`);
  }
};