"use server";

import {
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

/**
 * タグ文字列をパースしてタグ名の配列を返す
 *
 * @param tagsString stringifyされたタグのJSON文字列
 * @returns Tag textの配列
 */
const parseTags = (tagsString: string) => {
  if (!tagsString) return [];
  const tags: { id: string; text: string }[] = JSON.parse(tagsString);
  return tags.map((tag) => tag.text);
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
  const validated = ProductFormSchema.safeParse(
    getFormValues(formData, prevState.values),
  );
  if (!validated.success) {
    return {
      ...prevState,
      errors: validated.error.flatten().fieldErrors,
      message: "入力に不備があります",
    };
  }
  const {
    productName,
    price,
    description,
    imageFiles,
    tags,
    postageIsIncluded,
    isPublic,
    verificationCode,
    ...rest
  } = validated.data;
  const previousPrice = null;
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ...prevState,
      message: "セッションが切れました。再度ログインしてください。",
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

  const tagTexts = parseTags(tags);
  const images = await uploadToCloudinary(imageFiles);
  const listing: UnregisteredListing = {
    productName,
    price,
    previousPrice,
    description,
    sellerId: userId,
    isPublic: strToBool(isPublic),
    postageIsIncluded: strToBool(postageIsIncluded),
    ...rest,
  };

  const insertedListing = await createListingWithTagsAndImages(
    listing,
    tagTexts,
    images,
  );

  redirect(`/add-listing/complete?listing_id=${insertedListing.id}`);
};
