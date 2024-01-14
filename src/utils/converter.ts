import { type ValueOf } from "@/utils/types";

/**
 * プロパティ名にidとnameを持つオブジェクトの配列を、連想配列に変換する
 * @param obj プロパティ名にidとnameを持つオブジェクトの配列
 * @returns 連想配列
 */
export const objToAssociative = (
  obj: { id: string | number; name: string }[],
) =>
  obj.reduce<Record<string | number, string>>(
    (acc, cur) => ({
      ...acc,
      [cur.id]: cur.name,
    }),
    {},
  );

/**
 * 文字列をbooleanに変換する
 * "true"や"1"ならtrueを返す
 * "false"や"0"ならfalseを返す
 * @param value 変換する文字列
 */
export const strToBool = (value: string) => {
  if (!value) {
    return false;
  }
  return value.toLowerCase() === "true" || value === "1";
};

/**
 * 2進数を10進数に変換する
 * @param binaryArray 2進数
 * @returns 10進数
 */
export const binaryToDecimal = (binaryArray: boolean[]): number => {
  // 配列を反転して、最下位ビットを左に配置
  const reversedArray = binaryArray.slice().reverse();

  // reduce関数を使用して、10進数の値を計算
  // 0をtrue、1をfalseとして扱うため、currentがfalseの場合に加算する
  return reversedArray.reduce(
    (acc, current, index) => (!current ? acc + Math.pow(2, index) : acc),
    0,
  );
};

/**
 * 10進数を2進数に変換する
 * @param decimal 10進数
 * @param length 2進数の桁数
 * @returns 2進数の配列
 */
export const decimalToBinary = (decimal: number, length: number): boolean[] => {
  // 10進数を2進数に変換
  const binary = decimal.toString(2);
  const binaryArray = [...binary].map((value) => value === "0");

  // 必要に応じて、配列の長さを調整する
  if (length > binary.length) {
    const diff = length - binary.length;
    const trueArray = new Array<boolean>(diff).fill(true);
    return [...trueArray, ...binaryArray];
  }
  return binaryArray;
};

/**
 * Object.keysを型安全に使用するためのラッパー関数
 * @param obj オブジェクト
 */
export const getObjectKeys = <T extends Record<string, unknown>>(
  obj: T,
): (keyof T)[] => Object.keys(obj);

/**
 * Object.valuesを型安全に使用するためのラッパー関数
 * @param obj オブジェクト
 */
export const getObjectValues = <T extends Record<string, unknown>>(
  obj: T,
): ValueOf<T>[] => Object.values(obj) as ValueOf<T>[];
