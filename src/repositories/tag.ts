import { cache } from "react";

import prisma from "@/lib/prisma";
import "server-only";

/**
 * タグを追加する
 * @param text タグのテキスト
 * @returns
 */
export const createTag = async (text: string) =>
  await prisma.tag.create({
    data: {
      text,
    },
  });

/**
 * すべてのタグを取得する
 */
export const findTags = cache(async () => await prisma.tag.findMany());

/**
 * 指定されたIDのタグ情報を取得
 *
 * @param {string[]} ids - 取得対象のタグのIDの配列
 * @returns 取得したタグ情報
 */
export const findTagsByIds = cache(
  async (ids: string[]) =>
    await prisma.tag.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    }),
);

/**
 * 文字列に一致するタグを取得する
 * @param text
 * @returns 一致するタグ
 */
export const findTag = cache(
  async (text: string) =>
    await prisma.tag.findFirst({
      where: {
        text,
      },
    }),
);
