"use server";

import { uploadToS3 } from "@/lib/ImageUploadS3";
import { prisma } from "@/lib/db/prisma";
import { Product, Tag } from "@prisma/client";
import { redirect } from "next/navigation";
import { cache } from "react";
import z from "zod";

async function getNonMatchingTags(tags: Tag[]) {
  const allTagNames = await fetchTags();
  const existingTagNames = allTagNames.flatMap((tag) => tag.text);
  const nonMatchingTags = tags.filter(
    (tag) => !existingTagNames.includes(tag.text),
  );
  return nonMatchingTags;
}

/**
 *
 * @param tagsString
 * @returns
 */
async function processTags(tagsString?: string | null): Promise<string[]> {
  const tagsObject = tagsString ? JSON.parse(tagsString) : null;

  if (tagsObject) {
    const nonMatching = await getNonMatchingTags(tagsObject);
    await prisma.tag.createMany({
      data: nonMatching.map((tag) => ({ text: tag.text })),
    });
  }
  const matchingIds = tagsObject?.map((tag: Tag) => tag.id);

  tagsObject?.forEach(async (tag: Tag) => {
    const existingTag = await prisma.tag.findFirst({
      where: {
        text: tag.text,
      },
    });
    if (existingTag) {
      matchingIds?.push(existingTag.id);
    }
  });

  return matchingIds;
}

/**
 * フォームに入力された商品情報をDBに登録する
 * @param formData
 * @todo もうちょっといいエラーの処理方法を考えたい
 */
export const addProduct = async (formData: FormData, captchaValue: string | null | undefined) => {
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const price = Number(formData.get("price") || 0);
  const tagsString = formData.get("tags")?.toString();
  const imageFile = formData.get("imageFile") as File;
  if (!name || !description || !imageFile || !price) {
    return "必要な項目が存在しません";
  }

  if (!captchaValue) {
    return "reCAPTCHAを通してください";
  }

  const captchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret: z.string().nonempty().parse(process.env.GOOGLE_RECAPTCHA_SECRET_KEY),
      response: captchaValue,
    }).toString()
  });
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
  };

  await insertProduct(product);
  redirect("/");
  //失敗したときの処理を書いてない
};

/**
 * すべてのタグを取得する
 */
export const fetchTags = cache(async () => await prisma.tag.findMany());

/**
 * 文字列に一致するタグを取得する
 * @param text
 * @returns
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
 * @param product
 * @returns
 */
export const insertProduct = async (product: Product) => {
  const insertedProduct = await prisma.product.create({
    data: product,
  });
  return insertedProduct;
};
