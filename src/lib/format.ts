// 日本円の表記に変更する
// TODO: 通貨の表記を変更できるようにする
export function formatPrice(price: number) {
  return price.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
}
