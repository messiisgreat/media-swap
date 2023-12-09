import { cache } from "react";

import { type Listing } from "@prisma/client";

import prisma from "@/lib/prisma";
import "server-only";

/** データベース未登録のListing型 */
export type UnregisteredListing = Omit<
  Listing,
  "id" | "createdAt" | "updatedAt" | "isDeleted" | "transactionId" | "pageView"
>;

/** 画像とタグを含んだListingの配列 */
export type ListingsReadResult = Awaited<ReturnType<typeof findListings>>;

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

  return await prisma.listing.create({
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
 * @param {boolean} deleted - 削除済みの製品を取得するかどうか
 * @returns 取得した製品情報
 * @throws 製品が見つからない場合はエラーがスローされる
 */
export const findListingById = cache(async (id: string, isDeleted = false) => await prisma.listing.findUniqueOrThrow({
    where: { id, isPublic: true, isDeleted },
    include: {
      images: { select: { imageURL: true }, orderBy: { order: "asc" } },
      tags: {
        include: {
          tag: true,
        },
      },
      productCondition: true,
      shippingDays: true,
      shippingMethod: true,
    },
  }));

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
  async (page: number, size: number, orderBy: ListingOrderBy) => await prisma.listing.findMany({
      where: { isPublic: true, isDeleted: false },
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
    }),
);

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
  ) => await prisma.listing.findMany({
      where: {
        productName: { contains: query },
        isPublic: true,
        isDeleted: false,
      },
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
    }),
);

/**
 * 指定したユーザーが出品した商品を取得する
 */
export const findListingsBySellerId = cache(
  async (
    sellerId: string,
    page: number,
    size: number,
    orderBy: ListingOrderBy,
    isPublic?: boolean,
  ) => await prisma.listing.findMany({
      where: { sellerId, isPublic: isPublic, isDeleted: false },
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
    }),
);

/**
 * 商品総数を取得する
 */
export const countListings = cache(async () => await prisma.listing.count({
    where: { isPublic: true, isDeleted: false },
  }));

/**
 * 検索結果の商品総数を取得する
 * @param query 検索クエリ
 */
export const countListingsByProductName = cache(async (query: string) => await prisma.listing.count({
    where: { productName: { contains: query }, isDeleted: false },
  }));

/**
 * 指定したユーザーが出品した商品総数を取得する
 */
export const countListingsBySellerId = cache(
  async (sellerId: string, isPublic?: boolean) => await prisma.listing.count({
      where: { sellerId, isPublic: isPublic, isDeleted: false },
    }),
);

/**
 * 指定したユーザーが購入した商品総数を取得する
 */
export const countListingsByBuyerId = cache(async (buyerId: string) => await prisma.listing.count({
    where: {
      transaction: {
        buyerId,
      },
      isDeleted: false,
    },
  }));

/**
 * 指定したユーザーが購入した商品を取得する
 */
export const findListingsByBuyerId = cache(
  async (
    buyerId: string,
    page: number,
    size: number,
    orderBy: ListingOrderBy,
  ) => await prisma.listing.findMany({
      where: {
        transaction: {
          buyerId,
        },
        isPublic: true,
        isDeleted: false,
      },
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
    }),
);

/**
 * 商品を削除する
 *
 * @param id - 削除対象の商品のID
 */
export const deleteListing = async (id: string) => await prisma.listing.update({
    where: { id },
    data: { isDeleted: true },
  });

/**
 * 商品を更新する
 *
 * @param listing - 更新対象の商品
 */
export const updateListing = async (
  listing: { id: string } & Partial<Listing>,
) => await prisma.listing.update({
    where: { id: listing.id },
    data: listing,
  });

/**
 * 商品のtransactionIdを更新する
 *
 * @param listing - 更新対象の商品
 * @param transactionId - 更新後のtransactionId
 */
export const updateListingTransactionId = async (
  listing: { id: string } & Partial<Listing>,
  transactionId: string,
) => await prisma.listing.update({
    where: { id: listing.id },
    data: {
      transactionId: transactionId,
    },
  });

/**
 * 商品を通報
 * @param listingId 商品ID
 * @param reporterId 通報ユーザーID
 * @param reason 通報理由
 * @returns
 */
export const createListingReport = async (
  listingId: string,
  reporterId: string,
  reason: string,
) => {
  // 既に同じユーザーによる通報があるか確認
  const existingReport = await prisma.listingReport.findFirst({
    where: {
      listingId,
      userId: reporterId,
    },
  });

  if (existingReport) {
    throw new Error("This comment has already been reported by the user.");
  }

  return await prisma.listingReport.create({
    data: {
      listingId,
      userId: reporterId,
      comment: reason,
    },
  });
};
