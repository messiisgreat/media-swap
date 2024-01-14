/**
 * ObjectのValueの型を取得するUtility
 */
export type ValueOf<T> = T[keyof T];
