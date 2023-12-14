import prisma from "@/lib/prisma";
import { type Item } from "@prisma/client";
import { cache } from "react";
import "server-only";

/** データベース未登録のItem型 */
export type UnregisteredItem = Omit<
  Item,
  "id" | "createdAt" | "updatedAt" | "isDeleted" | "transactionId" | "pageView"
>;

/** 画像とタグを含んだItemの配列 */
export type ItemsReadResult = Awaited<ReturnType<typeof findItems>>;

/**
 * 商品を追加する
 * @param item 追加する商品
 * @param tagTexts タグIDの配列
 * @param imageURLs 画像URLの配列
 * @returns 追加された商品
 */
export const createItemWithTagsAndImages = async (
  item: UnregisteredItem,
  tagTexts: string[],
  imageURLs: string[],
) => {
  const { sellerId, ...rest } = item;

  return await prisma.item.create({
    data: {
      ...rest,
      seller: { connect: { id: sellerId } },
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
export const findItemById = cache(
  async (id: string, isDeleted = false) =>
    await prisma.item.findUniqueOrThrow({
      where: { id, isPublic: true, isDeleted },
      include: {
        images: { select: { imageURL: true }, orderBy: { order: "asc" } },
        tags: {
          include: {
            tag: true,
          },
        },
        transaction: true,
      },
    }),
);

/** findItem用の並び順型 */
export type ItemOrderBy =
  | {
      [P in keyof Item]?: "asc" | "desc" | undefined;
    }
  | undefined;

/**
 * 商品を取得する
 * @param page ページ番号
 * @param size 1ページあたりの商品数
 * @param order ソート順 例: { price: "asc" }
 */
export const findItems = cache(
  async (page: number, size: number, orderBy: ItemOrderBy) =>
    await prisma.item.findMany({
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
        transaction: { select: { id: true } },
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
export const findItemsByProductName = cache(
  async (query: string, page: number, size: number, orderBy: ItemOrderBy) =>
    await prisma.item.findMany({
      where: {
        name: { contains: query },
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
        transaction: { select: { id: true } },
      },
      orderBy,
    }),
);

/**
 * 指定したユーザーが出品した商品を取得する
 */
export const findItemsBySellerId = cache(
  async (
    sellerId: string,
    page: number,
    size: number,
    orderBy: ItemOrderBy,
    isPublic?: boolean,
  ) =>
    await prisma.item.findMany({
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
        transaction: { select: { id: true } },
      },
      orderBy,
    }),
);

/**
 * 商品総数を取得する
 */
export const countItems = cache(
  async () =>
    await prisma.item.count({
      where: { isPublic: true, isDeleted: false },
    }),
);

/**
 * 検索結果の商品総数を取得する
 * @param query 検索クエリ
 */
export const countItemsByProductName = cache(
  async (query: string) =>
    await prisma.item.count({
      where: { name: { contains: query }, isDeleted: false },
    }),
);

/**
 * 指定したユーザーが出品した商品総数を取得する
 */
export const countItemsBySellerId = cache(
  async (sellerId: string, isPublic?: boolean) =>
    await prisma.item.count({
      where: { sellerId, isPublic: isPublic, isDeleted: false },
    }),
);

/**
 * 指定したユーザーが購入した商品総数を取得する
 */
export const countItemsByBuyerId = cache(
  async (buyerId: string) =>
    await prisma.item.count({
      where: {
        transaction: {
          buyerId,
        },
        isDeleted: false,
      },
    }),
);

/**
 * 指定したユーザーが購入した商品を取得する
 */
export const findItemsByBuyerId = cache(
  async (buyerId: string, page: number, size: number, orderBy: ItemOrderBy) =>
    await prisma.item.findMany({
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
        transaction: { select: { id: true } },
      },
      orderBy,
    }),
);

/**
 * 商品を削除する
 *
 * @param id - 削除対象の商品のID
 */
export const deleteItem = async (id: string) =>
  await prisma.item.update({
    where: { id },
    data: { isDeleted: true },
  });

/**
 * 商品を更新する
 *
 * @param item - 更新対象の商品
 */
export const updateItem = async (item: { id: string } & Partial<Item>) =>
  await prisma.item.update({
    where: { id: item.id },
    data: item,
  });

/**
 * 商品を通報
 * @param itemId 商品ID
 * @param reporterId 通報ユーザーID
 * @param reason 通報理由
 * @returns
 */
export const createItemReport = async (
  itemId: string,
  reporterId: string,
  reason: string,
) => {
  // 既に同じユーザーによる通報があるか確認
  const existingReport = await prisma.itemReport.findFirst({
    where: {
      itemId,
      userId: reporterId,
    },
  });

  if (existingReport) {
    throw new Error("This comment has already been reported by the user.");
  }

  return await prisma.itemReport.create({
    data: {
      itemId,
      userId: reporterId,
      comment: reason,
    },
  });
};
