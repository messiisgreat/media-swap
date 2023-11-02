import "server-only";

import { prisma } from "@/lib/prisma";
import { Listing } from "@prisma/client";
import { cache } from "react";

/**
 * 商品を取得する
 *
 * @param {string} id - 取得対象の製品のID
 * @returns 取得した製品情報
 * @throws 製品が見つからない場合はエラーがスローされる
 */
export const findListing = cache(async (id: string) => {
  return prisma.listing.findUniqueOrThrow({
    where: { id },
    include: { listingImages: { include: { image: true } } },
  });
});

/**DB上で初期値を登録する値を除いたListing型 */
export type unregisteredListing = Omit<
  Listing,
  "id" | "createdAt" | "updatedAt"
>;

/**
 * 商品を追加する
 * @param listing 商品情報
 * @returns 追加された商品
 */
export const createListing = async (listing: unregisteredListing) => {
  return prisma.listing.create({
    data: listing,
  });
};

/**
 * 商品を削除する
 *
 * @param id - 削除対象の商品のID
 */
export const deleteListing = async (id: string) => {
  return prisma.listing.delete({ where: { id } });
};

/**
 * 商品を更新する
 *
 * @param listing - 更新対象の商品
 */
export const updateListing = async (
  listing: { id: string } & Partial<Listing>,
) => {
  return prisma.listing.update({
    where: { id: listing.id },
    data: listing,
  });
};
