import "server-only";

import { prisma } from "@/lib/prisma";
import { Product, Tag } from "@prisma/client";
import { cache } from "react";

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

/**DB上で初期値を登録する値を除いたProduct型 */
export type unregisteredProduct = Omit<
  Product,
  "id" | "createdAt" | "updatedAt"
>;

/**
 * 商品を追加する
 * @param product 商品情報
 * @returns 追加された商品
 */
export const insertProduct = async (product: unregisteredProduct) => {
  const insertedProduct = await prisma.product.create({
    data: product,
  });
  return insertedProduct;
};

/**
 * タグを追加及び更新する
 * @param tag タグ
 * @returns 更新されたタグ
 */
export const upsertTag = async (tag: Tag) => {
  const insertedTag = await prisma.tag.upsert({
    where: { text: tag.text },
    update: tag,
    create: tag,
  });
  return insertedTag;
};
