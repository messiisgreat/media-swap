import prisma from "@/lib/prisma";
import { type Item, type Prisma } from "@prisma/client";
import "server-only";

/** データベース未登録のItem型 */
export type ItemCreateInput = Prisma.ItemCreateWithoutSellerInput;

/** 画像とタグ,取引IDを含んだItemの配列 */
export type ItemsReadResult = Awaited<ReturnType<typeof findItems>>;

/** 画像とタグ,購入日を含んだItemの配列 */
export type ItemsReadResultByBuyerId = Awaited<
  ReturnType<typeof findItemsByBuyerId>
>;

/** 画像とタグを含んだItem */
export type ItemReadResult = Awaited<ReturnType<typeof findItemById>>;

/**
 * 商品を追加する
 * @param sellerId 出品者ID
 * @param item 商品情報
 * @param imageURLs 画像URL
 * @param tagTexts タグ
 * @returns 追加された商品
 */
export const createItem = (
  sellerId: string,
  item: ItemCreateInput,
  imageURLs: string[],
  tagTexts: string[],
) =>
  prisma.item.create({
    data: {
      ...item,
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

/**
 * 商品を取得する
 * @param id - 取得対象の製品のID
 * @param isDeleted 削除済みの製品を取得するかどうか
 * @returns 取得した製品情報
 */
export const findItemById = (id: string, isDeleted = false) =>
  prisma.item.findUniqueOrThrow({
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
  });

/** findItem用の並び順型 */
export type ItemOrderBy = Prisma.ItemOrderByWithRelationInput;

/** 商品取得系の共通include */
const include: Prisma.ItemInclude = {
  images: { select: { imageURL: true } },
  tags: {
    include: {
      tag: true,
    },
  },
  transaction: { select: { id: true } },
};

/**
 * 商品を取得する
 * @param page ページ番号
 * @param size 1ページあたりの商品数
 * @param orderBy ソート順
 */
export const findItems = (page: number, size: number, orderBy: ItemOrderBy) =>
  prisma.item.findMany({
    where: { isPublic: true, isDeleted: false },
    skip: (page - 1) * size,
    take: size,
    include,
    orderBy,
  });

/**
 * 商品の検索結果を取得する
 * @param query 検索クエリ
 * @param page ページ番号 (1始まり)
 * @param size 1ページあたりの商品数
 * @param orderBy ソート順
 * @returns 検索結果
 */
export const findItemsByProductName = (
  query: string,
  page: number,
  size: number,
  orderBy: ItemOrderBy,
) =>
  prisma.item.findMany({
    where: {
      name: { contains: query },
      isPublic: true,
      isDeleted: false,
    },
    skip: (page - 1) * size,
    take: size,
    include,
    orderBy,
  });

/**
 * 指定したユーザーが出品した商品を取得する
 * @param sellerId 出品者ID
 * @param page ページ番号
 * @param size 1ページあたりの商品数
 * @param orderBy ソート順
 * @param isPublic 公開中の商品のみを対象とするかどうか
 */
export const findItemsBySellerId = (
  sellerId: string,
  page: number,
  size: number,
  orderBy: ItemOrderBy,
  isPublic?: boolean,
) =>
  prisma.item.findMany({
    where: { sellerId, isPublic, isDeleted: false },
    skip: (page - 1) * size,
    take: size,
    include,
    orderBy,
  });

/**
 * 指定したユーザーが出品した取引中の商品を取得する
 * @param sellerId 出品者ID
 * @param page ページ番号
 * @param size 1ページあたりの商品数
 * @param orderBy ソート順
 * @param isPublic 公開中の商品のみを対象とするかどうか
 */
export const findItemsBySellerIdInTransaction = (
  sellerId: string,
  page: number,
  size: number,
  orderBy: ItemOrderBy,
  isPublic?: boolean,
) =>
  prisma.item.findMany({
    where: {
      sellerId,
      isPublic,
      isDeleted: false,
      transaction: {
        statusCode: {
          lte: 3,
        },
      },
    },
    skip: (page - 1) * size,
    take: size,
    include: {
      ...include,
      transaction: {
        select: {
          purchaseDate: true,
        },
      },
    },
    orderBy,
  });

/**
 * 指定したユーザーの売却済みの商品を取得する
 * @param sellerId 出品者ID
 * @param page ページ番号
 * @param size 1ページあたりの商品数
 * @param orderBy ソート順
 * @param isPublic 公開中の商品のみを対象とするかどうか
 */
export const findSoldItemsBySellerId = (
  sellerId: string,
  page: number,
  size: number,
  orderBy: ItemOrderBy,
  isPublic?: boolean,
) =>
  prisma.item.findMany({
    where: {
      sellerId,
      isPublic,
      isDeleted: false,
      transaction: {
        statusCode: 98,
      },
    },
    skip: (page - 1) * size,
    take: size,
    include: {
      ...include,
      transaction: {
        select: {
          purchaseDate: true,
        },
      },
    },
    orderBy,
  });

/**
 * 指定したユーザーが購入した商品を取得する
 * @param buyerId 購入者ID
 * @param page ページ番号
 * @param size 1ページあたりの商品数
 * @param orderBy ソート順
 */
export const findItemsByBuyerId = (
  buyerId: string,
  page: number,
  size: number,
  orderBy: ItemOrderBy,
) =>
  prisma.item.findMany({
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
      ...include,
      transaction: {
        select: {
          purchaseDate: true,
        },
      },
    },
    orderBy,
  });

/**
 * 指定したユーザーの購入取引中の商品を取得する
 * @param buyerId 購入者ID
 * @param page ページ番号
 * @param size 1ページあたりの商品数
 * @param orderBy ソート順
 */
export const findItemsByBuyerIdInTransaction = (
  buyerId: string,
  page: number,
  size: number,
  orderBy: ItemOrderBy,
) =>
  prisma.item.findMany({
    where: {
      transaction: {
        buyerId,
        statusCode: {
          lte: 3,
        },
      },
      isPublic: true,
      isDeleted: false,
    },
    skip: (page - 1) * size,
    take: size,
    include: {
      ...include,
      transaction: {
        select: {
          purchaseDate: true,
        },
      },
    },
    orderBy,
  });

/**
 * 指定したユーザーがいいねした商品を取得する
 * @param userId ユーザーID
 * @param page ページ番号
 * @param size 1ページあたりの商品数
 * @param orderBy ソート順
 */
export const findItemsByUserLiked = (
  userId: string,
  page: number,
  size: number,
  orderBy: ItemOrderBy,
) =>
  prisma.item.findMany({
    where: {
      likes: {
        some: {
          userId,
        },
      },
      isPublic: true,
      isDeleted: false,
    },
    skip: (page - 1) * size,
    take: size,
    include,
    orderBy,
  });

/**
 * 指定したユーザーが閲覧した商品を取得する
 * @param userId ユーザーID
 * @param page ページ番号
 * @param size 1ページあたりの商品数
 * @param orderBy ソート順
 */
export const findItemsByUserBrowsed = (
  userId: string,
  page: number,
  size: number,
  orderBy: ItemOrderBy,
) =>
  prisma.item.findMany({
    where: {
      historys: {
        some: {
          userId,
        },
      },
      isPublic: true,
      isDeleted: false,
    },
    skip: (page - 1) * size,
    take: size,
    include,
    orderBy,
  });

/**
 * 商品総数を取得する
 */
export const countItems = () =>
  prisma.item.count({
    where: { isPublic: true, isDeleted: false },
  });

/**
 * 検索結果の商品総数を取得する
 * @param query 検索クエリ
 */
export const countItemsByProductName = (query: string) =>
  prisma.item.count({
    where: { name: { contains: query }, isDeleted: false },
  });

/**
 * 指定したユーザーが出品した商品総数を取得する
 * @param sellerId 出品者ID
 * @param isPublic 公開中の商品のみを対象とするかどうか
 */
export const countItemsBySellerId = (sellerId: string, isPublic?: boolean) =>
  prisma.item.count({
    where: { sellerId, isPublic, isDeleted: false },
  });

/**
 * 指定したユーザーが出品した取引中の商品総数を取得する
 * @param sellerId 出品者ID
 * @param isPublic 公開中の商品のみを対象とするかどうか
 */
export const countItemsBySellerIdInTransaction = (
  sellerId: string,
  isPublic?: boolean,
) =>
  prisma.item.count({
    where: {
      sellerId,
      isPublic,
      isDeleted: false,
      transaction: {
        statusCode: {
          lte: 3,
        },
      },
    },
  });

/**
 * 指定したユーザーが売却済みの商品総数を取得する
 * @param sellerId 出品者ID
 * @param isPublic 公開中の商品のみを対象とするかどうか
 */
export const countSoldItemsBySellerId = (
  sellerId: string,
  isPublic?: boolean,
) =>
  prisma.item.count({
    where: {
      sellerId,
      isPublic,
      isDeleted: false,
      transaction: {
        statusCode: 98,
      },
    },
  });

/**
 * 指定したユーザーが購入した商品総数を取得する
 * @param buyerId 購入者ID
 */
export const countItemsByBuyerId = (buyerId: string) =>
  prisma.item.count({
    where: {
      transaction: {
        buyerId,
      },
      isDeleted: false,
    },
  });

/**
 * 指定したユーザーの購入取引中の商品総数を取得する
 * @param buyerId 購入者ID
 */
export const countItemsByBuyerIdInTransaction = (buyerId: string) =>
  prisma.item.count({
    where: {
      transaction: {
        buyerId,
        statusCode: {
          lte: 3,
        },
      },
      isDeleted: false,
    },
  });

/**
 * 指定したユーザーがいいねした商品総数を取得する
 * @param userId ユーザーID
 */
export const countItemsByUserLiked = (userId: string) =>
  prisma.item.count({
    where: {
      likes: {
        some: {
          userId,
        },
      },
      isPublic: true,
      isDeleted: false,
    },
  });
/**
 * 指定したユーザーが閲覧した商品総数を取得する
 * @param userId ユーザーID
 */
export const countItemsByUserBrowsed = (userId: string) =>
  prisma.item.count({
    where: {
      historys: {
        some: {
          userId,
        },
      },
      isPublic: true,
      isDeleted: false,
    },
  });

/**
 * 商品を削除する
 *
 * @param id - 削除対象の商品のID
 */
export const deleteItem = (id: string) =>
  prisma.item.update({
    where: { id },
    data: { isDeleted: true },
  });

/**
 * 商品を更新する
 *
 * @param item - 更新対象の商品
 */
export const updateItem = (item: { id: string } & Partial<Item>) =>
  prisma.item.update({
    where: { id: item.id },
    data: item,
  });
