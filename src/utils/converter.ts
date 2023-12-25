/**
 * プロパティ名にidとnameを持つオブジェクトの配列を、連想配列に変換する
 * @param obj プロパティ名にidとnameを持つオブジェクトの配列
 * @returns 連想配列
 */
export const objToAssociative = (
  obj: { id: string | number; name: string }[],
) =>
  obj.reduce(
    (acc, cur) => {
      acc[cur.id] = cur.name;
      return acc;
    },
    {} as { [key: string | number]: string },
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
