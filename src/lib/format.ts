/**
 * 日本円の表記に変更する
 * @todo 通貨の表記を変更できるようにする
 * @param price 価格
 * @returns 日本円表記の文字列
 */
export function formatPrice(price: number): string {
  return price.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
}
