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
export const findListingById = cache(async (id: string) => {
  return prisma.listing.findUniqueOrThrow({
    where: { id },
    include: {
      images: { include: { image: true } },
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
});

/** findListingByProductName用の並び順型付け */
export type ListingOrderBy =
  | {
      [P in keyof Listing]?: "asc" | "desc" | undefined;
    }
  | undefined;

/**
 * 商品の検索結果を取得する
 * @param query 検索クエリ
 * @param order ソート順 例: { price: "asc" }
 * @returns 検索結果
 */
export const findListingByProductName = cache(
  async (query: string, order: ListingOrderBy) => {
    return prisma.listing.findMany({
      where: { productName: { contains: query } },
      include: {
        images: { include: { image: true } },
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: order,
    });
  },
);

/**
 * 商品を追加する
 * @param listing 商品情報
 * @param tagIds タグIDの配列
 * @param images 画像のURLの配列
 * @returns 追加された商品
 */
export const createListingWithTagsAndImages = async (
  listing: Omit<
    Listing,
    "id" | "createdAt" | "updatedAt" | "isDeleted" | "transactionId"
  >,
  tagIds: string[],
  images: string[],
) => {
  return prisma.listing.create({
    data: {
      ...listing,
      tags: {
        connect: tagIds.map((id) => ({ id })),
      },
      images: {
        create: {
          ...images.map((image) => ({
            image: {
              create: {
                imageURL: image,
              },
            },
          })),
        },
      },
    },
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
