/**
 * 日本円の表記に変更する
 * @param price 価格
 * @returns 日本円表記の文字列
 */
export const formatPrice = (price: number): string =>
  price.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
