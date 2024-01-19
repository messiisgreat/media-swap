import prisma from "@/lib/prisma";
import { type Prisma } from "@prisma/client";
import "server-only";

/** 登録用DraftItem型 */
export type DraftItemCreateInput = Prisma.DraftItemCreateWithoutSellerInput;

/**
 * 下書き商品を作成する
 * @param sellerId 出品者ID
 * @param draftItem 下書き商品情報
 * @param imageURLs 画像URL
 * @param tagTexts タグ
 */
export const createDraftItem = (
  sellerId: string,
  draftItem: DraftItemCreateInput,
  imageURLs?: string[],
  tagTexts?: string[],
) =>
  prisma.draftItem.create({
    data: {
      ...draftItem,
      seller: { connect: { id: sellerId } },
      ...(imageURLs
        ? {
            images: {
              createMany: {
                data: imageURLs?.map((imageURL, i) => ({ imageURL, order: i })),
              },
            },
          }
        : {}),
      ...(tagTexts
        ? {
            tags: {
              create: tagTexts.map((text) => ({
                tag: { connectOrCreate: { where: { text }, create: { text } } },
              })),
            },
          }
        : {}),
    },
  });
