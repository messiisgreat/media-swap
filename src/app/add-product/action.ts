"use server";

import {
  insertProduct,
  unregisteredProduct,
  upsertTag,
} from "@/app/add-product/server";
import { fetchVerifyResult } from "@/components/securityVerifier/fetcher";
import { uploadToS3 } from "@/lib/ImageUploadS3";
import getSession from "@/utils/getSession";
import { Tag } from "@prisma/client";
import cuid from "cuid";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

/**
 * 受け取ったタグ文字列をDBに登録する
 * upsertで同一IDのタグが存在する場合は更新する
 *
 * @param tagsString タグの文字列
 * @returns DBに存在するタグのIDの配列
 */
async function processTags(tagsString?: string | null): Promise<string[]> {
  if (!tagsString) return [];
  try {
    const tags: Tag[] = JSON.parse(tagsString);

    const upsertedTags = await Promise.all(
      tags.map(async (tag) => await upsertTag(tag)),
    );
    console.log(upsertedTags);
    return upsertedTags.map((tag) => tag.id);
  } catch (e) {
    return [];
  }
}

/**
 * フォームに入力された商品情報をDBに登録する
 * 入力されていない項目がある場合やreCAPTCHAに不備がある場合Toastに渡す用のメッセージを返す
 * @param formData 商品情報が入力されたFormData
 * @param captchaValue reCAPTCHAのトークン
 */
export const addProduct = async (
  formData: FormData,
  captchaValue: string | null | undefined,
) => {
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const price = Number(formData.get("price"));
  const tagsString = formData.get("tags")?.toString();
  const imageFile = formData.get("imageFile") as File;
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) throw new Error("User is not authenticated");
  if (!name) return "商品名を入力してください";
  if (!description) return "商品説明を入力してください";
  if (!imageFile) return "画像を選択してください";
  if (!price) return "価格を入力してください";
  if (!captchaValue) return "reCAPTCHAを通してください";

  const isVerified = await fetchVerifyResult(captchaValue);
  if (!isVerified) return "reCAPTCHAが正しくありません";

  console.log(tagsString);
  const tagIds = await processTags(tagsString);
  const imageUrl = await uploadToS3(imageFile, `products/${cuid()}`);

  console.log(tagIds);
  const product: unregisteredProduct = {
    name,
    description,
    imageUrl,
    price,
    tagIds,
    userId,
    status: null,
    condition: null,
    shippingCost: null,
    daysToShip: null,
    shippingMethod: null,
    sellingPrice: null,
  };

  await insertProduct(product);
  redirect("/");
};

/**
 * 商品を登録する。エラーが発生した場合はトーストを表示する。
 * @param formData フォームデータ
 * @param verifiedValue reCAPTCHAのトークン
 */
export const action = async (
  formData: FormData,
  verifiedValue: string | null,
) => {
  const e = await addProduct(formData, verifiedValue);
  if (typeof e === "string") {
    toast.error(e);
  }
};
