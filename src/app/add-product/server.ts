"use server";

import { prisma } from "@/lib/db/prisma";
import { Product } from "@prisma/client";
import { cache } from "react";

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
