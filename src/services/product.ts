import "server-only";

import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { cache } from "react";

/**
 * 商品のステータスを更新する
 *
 * @param productId - 更新対象の商品ID
 */
export const updateProductStatus = async (productId: string) => {
  await prisma.product.update({
    where: { id: productId },
    data: { status: "sold" },
  });
};

/**
 * 商品を取得する
 *
 * @param {string} id - 取得対象の製品のID
 * @returns 取得した製品情報
 * @throws 製品が見つからない場合はエラーがスローされる
 */
export const findProduct = cache(async (id: string) => {
  const product = await prisma.product.findUniqueOrThrow({ where: { id } });
  return product;
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
export const createProduct = async (product: unregisteredProduct) => {
  const insertedProduct = await prisma.product.create({
    data: product,
  });
  return insertedProduct;
};
