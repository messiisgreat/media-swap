"use server";

import { productFormData } from "@/app/add-listing/types";
import { fetchVerifyResult } from "@/components/securityVerifier/fetcher";
import { uploadToCloudinary } from "@/lib/ImageUploadCloudinary";
import {
  UnregisteredListing,
  createListingWithTagsAndImages,
} from "@/services/listing";
import { createTag } from "@/services/tag";
import { getFormValues } from "@/utils/extendsForm";
import getSession from "@/utils/getSession";
import { redirect } from "next/navigation";

/**
 * タグ文字列の処理を行う。
 * 未登録のタグをDBに登録し、登録済みのタグと併せてタグIDの配列を返す
 *
 * @param tagsString stringifyされたタグのJSON文字列
 * @returns Tag IDの配列
 */
async function processTags(tagsString?: string | null): Promise<string[]> {
  if (!tagsString) return [];
  try {
    const tags: { id: string; text: string }[] = JSON.parse(tagsString);
    const [newTags, existingTags] = tags.reduce(
      (acc, tag) => {
        tag.id === tag.text ? acc[0].push(tag) : acc[1].push(tag);
        return acc;
      },
      [[], []] as [
        { id: string; text: string }[],
        { id: string; text: string }[],
      ],
    );

    const createdTagIds = await Promise.all(
      newTags.map(async (tag) => await createTag(tag.text)),
    ).then((tags) => tags.map((tag) => tag.id));
    return [...existingTags.map((tag) => tag.id), ...createdTagIds];
  } catch (e) {
    return [];
  }
}

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

  const tagIds = await processTags(tags);
  const images = await uploadToCloudinary(imageFiles);

  const listing: UnregisteredListing = {
    productName,
    price,
    previousPrice,
    description,
    sellerId: userId,
    isPublic: true,
    postageIsIncluded: Boolean(postageIsIncluded),
    ...rest,
  };

  const insertedListing = await createListingWithTagsAndImages(
    listing,
    tagIds,
    images,
  );

  redirect(`/add-listing/complete?listing_id=${insertedListing.id}`);
};