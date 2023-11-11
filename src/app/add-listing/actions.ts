"use server";

import { productFormData } from "@/app/add-listing/types";
import { fetchVerifyResult } from "@/components/securityVerifier/fetcher";
import { uploadToCloudinary } from "@/lib/ImageUploadCloudinary";
import {
  UnregisteredListing,
  createListingWithTagsAndImages,
} from "@/services/listing";
import { strToBool } from "@/utils/converter";
import { getFormValues } from "@/utils/extendsForm";
import getSession from "@/utils/getSession";
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
 * フォームに入力された商品情報をDBに登録し、完了後に確認ページにリダイレクトする
 * 入力されていない項目がある場合やreCAPTCHAに不備がある場合Toastに渡す用のメッセージを返す
 * @param formData 商品情報が入力されたFormData
 * @param captchaValue reCAPTCHAのトークン
 */
export const addListing = async (
  formData: FormData,
  captchaValue: string | null | undefined,
) => {
  const formValues = getFormValues(formData, productFormData);
  const {
    productName,
    price,
    description,
    imageFiles,
    tags,
    postageIsIncluded,
    isPublic,
    ...rest
  } = formValues;
  const previousPrice = null;
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) throw new Error("User is not authenticated");
  if (!productName) return "商品名を入力してください";
  if (!description) return "商品説明を入力してください";
  if (!imageFiles) return "画像を選択してください";
  if (!price) return "価格を入力してください";
  if (!captchaValue) return "reCAPTCHAを通してください";

  const isVerified = await fetchVerifyResult(captchaValue);
  if (!isVerified) return "reCAPTCHAが正しくありません";

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
