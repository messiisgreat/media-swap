"use server";

import getSession from "@/app/actions/getSession";
import { uploadToS3 } from "@/lib/ImageUploadS3";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { Product, Tag } from "@prisma/client";
import { redirect } from "next/navigation";
import { cache } from "react";

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
// async fu
async function processTags(tagsString?: string | null): Promise<string[]> {
  let matchingIds: string[] = [];

  if (!tagsString) {
    return matchingIds; // タグが提供されていない場合は、空の配列を返します。
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

    // すべてのタグのIDを収集
    matchingIds = await Promise.all(
      tagsObject.map(async (tag) => {
        const existingTag = await prisma.tag.findFirst({
          where: { text: tag.text },
        });
        return existingTag ? existingTag.id : "";
      }),
    );
  } catch (error) {
    console.error("An error occurred during tag processing:", error);
    // 必要に応じてエラーをスローするか、エラーハンドリングを行います。
  }

  return matchingIds.filter((id) => id !== ""); // 空のIDをフィルタリングして返す
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

  const captchaResponse = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: env.GOOGLE_RECAPTCHA_SECRET_KEY,
        response: captchaValue,
      }).toString(),
    },
  );
  const captchaResponseJson = await captchaResponse.json();

  if (!captchaResponseJson.success) {
    return "reCAPTCHAが正しくありません";
  }

  const tagIds = await processTags(tagsString);

  const imageUrl = await uploadToS3(
    imageFile,
    `products/${Date.now()}_${name}`, // 一意のIDをつけるべきでは？
  );

  /** @todo 必須の型がいろいろと不足しているのでanyにしてある */
  const product: any = {
    name,
    description,
    imageUrl,
    price,
    tagIds,
    userId,
  };

  try {
    await insertProduct(product);
    redirect("/");
  } catch (error) {
    console.error("An error occurred while inserting the product:", error);
    // 必要に応じてエラーをスローするか、エラーハンドリングを行います。
  }
};

/**
 * すべてのタグを取得する
 */
export const fetchTags = cache(async () => await prisma.tag.findMany());

/**
 * 文字列に一致するタグを取得する
 * @param text
 * @returns 一致するタグ
 */
export const fetchTag = cache(async (text: string) => {
  const tag = await prisma.tag.findFirst({
    where: {
      text: text,
    },
  });
  return tag;
});

/**
 * 商品を追加する
 * @param product 商品情報
 * @returns 追加された商品
 */
export const insertProduct = async (product: Product) => {
  const insertedProduct = await prisma.product.create({
    data: product,
  });
  return insertedProduct;
};
