"use server";

import {
  fetchTags,
  insertProduct,
  unregisteredProduct,
} from "@/app/add-product/server";
import { fetchVerifyResult } from "@/components/securityVerifier/fetcher";
import { uploadToS3 } from "@/lib/ImageUploadS3";
import { prisma } from "@/lib/prisma";
import getSession from "@/utils/getSession";
import { Tag } from "@prisma/client";
import { redirect } from "next/navigation";

/**
 * タグの配列から、DBに存在しないタグの配列を取得する
 * @param tags タグの配列
 * @returns DBに存在しないタグの配列
 */
async function getNonMatchingTags(tags: Tag[]): Promise<Tag[]> {
  const allTagNames = await fetchTags();
  const existingTagNames = allTagNames.flatMap((tag) => tag.text);
  const nonMatchingTags = tags.filter(
    (tag) => !existingTagNames.includes(tag.text),
  );
  return nonMatchingTags;
}

/**
 * タグの文字列をパースして、DBに存在するタグのIDの配列を取得する
 * @param tagsString タグの文字列
 * @returns DBに存在するタグのIDの配列
 */
async function processTags(tagsString?: string | null): Promise<string[]> {
  // tagsStringが提供されていない場合、空の配列を直ちに返す。
  if (!tagsString) {
    return [];
  }

  try {
    const tagsObject: Tag[] = JSON.parse(tagsString);

    // DBに存在しないタグをフィルタリング
    const nonMatching = await getNonMatchingTags(tagsObject);

    // DBに存在しないタグがある場合のみ、それらを作成
    if (nonMatching.length > 0) {
      await prisma.tag.createMany({
        data: nonMatching.map((tag) => ({ text: tag.text })),
      });
    }

    // すべてのタグのIDを収集し、結果を直接returnする。
    // このパターンは「即時returnパターン」と呼ばれ、不要な一時変数を避けるために使用されます。
    return (
      await Promise.all(
        tagsObject.map(async (tag) => {
          const existingTag = await prisma.tag.findFirst({
            where: { text: tag.text },
          });
          return existingTag ? existingTag.id : "";
        }),
      )
    ).filter((id) => id !== ""); // 空のIDをフィルタリング
  } catch (error) {
    console.error("An error occurred during tag processing:", error);
    // エラーが発生した場合、空の配列を返して処理を継続、またはエラーをスローする
    return [];
  }
}

/**
 * フォームに入力された商品情報をDBに登録する
 * @param formData 商品情報が入力されたFormData
 * @param captchaValue reCAPTCHAのトークン
 * @todo もうちょっといいエラーの処理方法を考えたい
 */
export const addProduct = async (
  formData: FormData,
  captchaValue: string | null | undefined,
) => {
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const price = Number(formData.get("price") || 0);
  const tagsString = formData.get("tags")?.toString();
  const imageFile = formData.get("imageFile") as File;

  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  if (!name || !description || !imageFile || !price) {
    return "必要な項目が存在しません";
  }

  if (!captchaValue) {
    return "reCAPTCHAを通してください";
  }

  const isVerified = await fetchVerifyResult(captchaValue);

  if (!isVerified) {
    return "reCAPTCHAが正しくありません";
  }

  const tagIds = await processTags(tagsString);

  const imageUrl = await uploadToS3(
    imageFile,
    `products/${Date.now()}_${name}`, // 一意のIDをつけるべきでは？
  );

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
