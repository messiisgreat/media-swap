import prisma from "@/lib/prisma";
import "server-only";

/**
 * タグを追加する
 * @param text タグのテキスト
 * @returns
 */
export const createTag = (text: string) =>
  prisma.tag.create({
    data: {
      text,
    },
  });

/**
 * すべてのタグを取得する
 */
export const findTags = () => prisma.tag.findMany();

/**
 * 指定されたIDのタグ情報を取得
 *
 * @param {string[]} ids - 取得対象のタグのIDの配列
 * @returns 取得したタグ情報
 */
export const findTagsByIds = (ids: string[]) =>
  prisma.tag.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

/**
 * 文字列に一致するタグを取得する
 * @param text タグのテキスト
 * @returns 一致するタグ
 */
export const findTag = (text: string) =>
  prisma.tag.findFirst({
    where: {
      text,
    },
  });
