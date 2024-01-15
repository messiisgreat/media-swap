/**
 * ObjectのValueの型を取得するUtility
 */
export type ValueOf<T> = T[keyof T];

/**
 * URLを表す文字列型
 */
export type URLString = `${string}://${string}`;
