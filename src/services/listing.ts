import "server-only";

import prisma from "@/lib/prisma";
import { Listing } from "@prisma/client";
import { cache } from "react";

/** データベース未登録のListing型 */
export type UnregisteredListing = Omit<
  Listing,
  "id" | "createdAt" | "updatedAt" | "isDeleted" | "transactionId" | "pageView"
>;

/**
 * 商品を追加する
 * @param listing 追加する商品
 * @param tagTexts タグIDの配列
 * @param imageURLs 画像URLの配列
 * @returns 追加された商品
 */
export const createListingWithTagsAndImages = async (
  listing: UnregisteredListing,
  tagTexts: string[],
  imageURLs: string[],
) => {
  const {
    sellerId,
    shippingDaysId,
    shippingMethodId,
    productConditionId,
    ...rest
  } = listing;

  return prisma.listing.create({
    data: {
      ...rest,
      seller: { connect: { id: sellerId } },
      shippingDays: shippingDaysId ? { connect: { id: shippingDaysId } } : {},
      shippingMethod: shippingMethodId
        ? { connect: { id: shippingMethodId } }
        : {},
      productCondition: productConditionId
        ? { connect: { id: productConditionId } }
        : {},
      images: {
        createMany: {
          data: imageURLs.map((imageURL, i) => ({ imageURL, order: i })),
        },
      },
      tags: {
        create: tagTexts.map((text) => ({
          tag: { connectOrCreate: { where: { text }, create: { text } } },
        })),
      },
    },
  });
};

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
      images: { select: { imageURL: true }, orderBy: { order: "asc" } },
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
});

/** findListing用の並び順型 */
export type ListingOrderBy =
  | {
      [P in keyof Listing]?: "asc" | "desc" | undefined;
    }
  | undefined;

/**
 * 商品を取得する
 * @param page ページ番号
 * @param size 1ページあたりの商品数
 * @param order ソート順 例: { price: "asc" }
 */
export const findListings = cache(
  async (page: number, size: number, orderBy: ListingOrderBy) => {
    return prisma.listing.findMany({
      skip: (page - 1) * size,
      take: size,
      include: {
        images: { select: { imageURL: true }, orderBy: { order: "asc" } },
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy,
    });
  },
);

/**
 * 商品総数を取得する
 */
export const countListings = cache(async () => {
  return prisma.listing.count();
});

/**
 * 検索結果の商品総数を取得する
 * @param query 検索クエリ
 */
export const countListingsByProductName = cache(async (query: string) => {
  return prisma.listing.count({ where: { productName: { contains: query } } });
});

/**
 * 商品の検索結果を取得する
 * @param query 検索クエリ
 * @param page ページ番号 (1始まり)
 * @param size 1ページあたりの商品数
 * @param order ソート順 例: { price: "asc" }
 * @returns 検索結果
 */
export const findListingsByProductName = cache(
  async (
    query: string,
    page: number,
    size: number,
    orderBy: ListingOrderBy,
  ) => {
    return prisma.listing.findMany({
      skip: (page - 1) * size,
      take: size,
      where: { productName: { contains: query } },
      include: {
        images: { select: { imageURL: true }, orderBy: { order: "asc" } },
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy,
    });
  },
);

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
