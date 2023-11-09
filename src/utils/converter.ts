/**
 * プロパティ名にidとnameを持つオブジェクトの配列を、連想配列に変換する
 * @param obj プロパティ名にidとnameを持つオブジェクトの配列
 * @returns 連想配列
 */
export const objToAssociative = (
  obj: { id: string | number; name: string }[],
) => {
  return obj.reduce(
    (acc, cur) => {
      acc[cur.id] = cur.name;
      return acc;
    },
    {} as { [key: string | number]: string },
  );
};
