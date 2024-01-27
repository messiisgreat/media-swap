import { getObjectKeys } from "@/utils/converter";
import { type URLString } from "@/utils/types";

/**
 * Fileの配列かどうかを判定する
 * @param arg 任意の値
 */
export const isArrayOfFiles = (arg: unknown): arg is File[] => {
  if (Array.isArray(arg)) {
    return arg.every((item) => item instanceof File);
  }
  return false;
};

/**
 * stringの配列かどうかを判定する
 * @param arg 任意の値
 */
export const isArrayOfStrings = (arg: unknown): arg is string[] => {
  if (Array.isArray(arg)) {
    return arg.every((item) => typeof item === "string");
  }
  return false;
};

/**
 * URL文字列かどうかを判定する
 * @param string 任意の文字列
 */
export const isURLString = (string: string): string is URLString => {
  try {
    new URL(string);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * 指定した文字列が()で囲まれているかどうかを判定する
 * @param string 任意の文字列
 */
export const isEnclosedInParentheses = (string: string) =>
  /^\([^)]+\)$/.test(string);

/**
 * 連想配列をもとに、そのキーの型ガードを作成する
 * @example
 * ```ts
 * const isKey = generateKeyGuard({ key1: "value1", key2: "value2" } as const);
 * const code = getCode();
 * if (isKey(code)) {
 *  // この中でcodeはkey1 | key2型であることが保証される
 * }
 * ```
 * @param obj 連想配列
 */
export const generateKeyGuard = <T extends string | number>(
  obj: Record<T, string | number>,
) => {
  const keySet = new Set(getObjectKeys(obj));
  return (arg: unknown): arg is T => keySet.has(arg as T);
};
