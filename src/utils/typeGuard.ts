/**
 * Fileの配列かどうかを判定する
 * @param arr 任意の値
 */
export function isArrayOfFiles(arr: any): arr is File[] {
  if (Array.isArray(arr)) {
    return arr.every((item) => item instanceof File);
  }
  return false;
}
