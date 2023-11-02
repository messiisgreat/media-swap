import "server-only";

import { prisma } from "@/lib/prisma";
import { Listing } from "@prisma/client";
import { cache } from "react";

/**
 * 商品のステータスを更新する
 *
 * @param productId - 更新対象の商品ID
 */
export const updateListingStatus = async (productId: string) => {
  return prisma.product.update({
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
export const findListing = cache(async (id: string) => {
  return prisma.product.findUniqueOrThrow({ where: { id } });
});

/**DB上で初期値を登録する値を除いたListing型 */
export type unregisteredListing = Omit<
  Listing,
  "id" | "createdAt" | "updatedAt"
>;

/**
 * 商品を追加する
 * @param product 商品情報
 * @returns 追加された商品
 */
export const createListing = async (product: unregisteredListing) => {
  return prisma.product.create({
    data: product,
  });
};
