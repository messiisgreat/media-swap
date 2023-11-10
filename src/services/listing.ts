import "server-only";

import prisma from "../lib/prisma";
import { Listing } from '@prisma/client';
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
  async (page: number, size: number, order: ListingOrderBy) => {
    return prisma.listing.findMany({
      skip: (page - 1) * size,
      take: size,
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
 * 商品の検索結果を取得する
 * @param query 検索クエリ
 * @param page ページ番号 (1始まり)
 * @param size 1ページあたりの商品数
 * @param order ソート順 例: { price: "asc" }
 * @returns 検索結果
 */
export const findListingByProductName = cache(
  async (query: string, page: number, size: number, order: ListingOrderBy) => {
    return prisma.listing.findMany({
      skip: (page - 1) * size,
      take: size,
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

/** データベースいまだ未登録のListing型 */
export type UnregisteredListing = Omit<
  Listing,
  "id" | "createdAt" | "updatedAt" | "isDeleted" | "transactionId" | "pageView"
>;

/**
 * 商品を追加する
 * @param listing 商品情報
 * @param tagIds タグIDの配列
 * @param images 画像のURLの配列
 * @returns 追加された商品
 */
// `UnregisteredListing`から`sellerId`を分割代入し、それを使用してsellerを接続します。
export const createListingWithTagsAndImages = async (
  {
    sellerId,
    shippingDaysId, // このフィールドは `string | null` 型です
    shippingMethodId, // 同上
    productConditionId, // 同上
    ...restOfListing
  }: UnregisteredListing,
  tagIds: string[],
  images: string[],
) => {
  // まずリスティングを作成
  const createdListing = await prisma.listing.create({
    data: {
      ...restOfListing,
      seller: { connect: { id: sellerId } },
      shippingDays: shippingDaysId
        ? { connect: { id: shippingDaysId } }
        : undefined,
      shippingMethod: shippingMethodId
        ? { connect: { id: shippingMethodId } }
        : undefined,
      productCondition: productConditionId
        ? { connect: { id: productConditionId } }
        : undefined,
      // タグと画像は後で追加
    },
  });

  // タグとの関連付け
  if (tagIds.length > 0) {
    await Promise.all(
      tagIds.map((tagId) =>
        prisma.listingTag.create({
          data: {
            listingId: createdListing.id,
            tagId: tagId,
          },
        }),
      ),
    );
  }

  // 画像の保存とリスティングとの関連付け
  await Promise.all(
    images.map(async (imageURL) => {
      // まず `Image` モデルに画像を保存
      const image = await prisma.image.create({
        data: { imageURL },
      });

      // 次に `ListingImage` モデルに関連付け
      return prisma.listingImage.create({
        data: {
          listingId: createdListing.id,
          imageId: image.id,
        },
      });
    }),
  );

  return createdListing;
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
