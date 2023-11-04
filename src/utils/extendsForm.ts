/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */

type FormObject = { [key: string]: string | number | File };

/**
 * FormData を型安全に扱うための型
 * 型引数に渡されたオブジェクトのキーのみ指定できるように拡張している
 * @param T FormDataのオブジェクト
 * @see https://developer.mozilla.org/ja/docs/Web/API/FormData
 */
export interface TypedFormData<T extends FormObject> extends FormData {
  append<K extends keyof T>(
    name: K,
    value: string | Blob,
    fileName?: string,
  ): void;
  delete<K extends keyof T>(name: K): void;
  get<K extends keyof T>(name: K): FormDataEntryValue | null;
  getAll<K extends keyof T>(name: K): FormDataEntryValue[];
  has<K extends keyof T>(name: K): boolean;
  set<K extends keyof T>(
    name: K,
    value: string | Blob,
    fileName?: string,
  ): void;
  forEach<K extends keyof T>(
    callbackfn: (
      value: FormDataEntryValue,
      key: K,
      parent: TypedFormData<T>,
    ) => void,
    thisArg?: any,
  ): void;
}

/**
 * formDataから全ての値を取得する
 * @param formData 型情報を含んだFormData
 */
export const getFormValues = <T extends FormObject>(
  formData: TypedFormData<T>,
) =>
  Object.keys(formData).reduce(
    (acc, key) => {
      const value = formData.get(key);
      if (value) acc[key] = value;
      return acc;
    },
    {} as { [key: string]: string | number | File },
  ) as T;
