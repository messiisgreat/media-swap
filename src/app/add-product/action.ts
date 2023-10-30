"use server";

import {
  createProduct,
  createTag,
  unregisteredProduct,
} from "@/app/add-product/server";
import { fetchVerifyResult } from "@/components/securityVerifier/fetcher";
import { uploadToS3 } from "@/lib/ImageUploadS3";
import getSession from "@/utils/getSession";
import { Tag } from "@prisma/client";
import cuid from "cuid";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

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
    const tags: Tag[] = JSON.parse(tagsString);
    const [newTags, existingTags] = tags.reduce(
      (acc, tag) => {
        tag.id === tag.text ? acc[0].push(tag) : acc[1].push(tag);
        return acc;
      },
      [[], []] as [Tag[], Tag[]],
    );

    const createdTags = await Promise.all(
      newTags.map(async (tag) => await createTag(tag.text)),
    );
    console.log(createdTags);
    return [...existingTags, ...createdTags].map((tag) => tag.id);
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

  const tagIds = await processTags(tagsString);
  const imageUrl = await uploadToS3(imageFile, `products/${cuid()}`);

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

  const insertedProduct = await createProduct(product);
  redirect(`/products/complete?product_id=${insertedProduct.id}`);
};

/**
 * 商品を登録する。エラーが発生した場合はトーストを表示する。
 * @param formData フォームデータ
 * @param verifiedValue reCAPTCHAのトークン
 */
export const productFormAction = async (
  formData: FormData,
  verifiedValue: string | null,
) => {
  const e = await addProduct(formData, verifiedValue);
  if (typeof e === "string") {
    toast.error(e);
  }
};
