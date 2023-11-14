import {
  ProductCondition,
  ShippingDays,
  ShippingMethod,
  TransactionRatingOption,
} from "@prisma/client";

// 注意: このファイルは自動生成されます。本番環境に影響してしまうため、リリース後の変更は行わないでください。
// 項目を差し替えたい場合は、変更するのではなく、使用しなくなった項目をコメントアウトし、新しい採番で追加を行ってください。

/** 商品の状態 */
export const PRODUCT_CONDITION: ProductCondition[] = [
  { id: "0".padStart(24, "0"), name: "新品または未使用" },
  { id: "1".padStart(24, "0"), name: "目立った傷や汚れなし" },
  { id: "2".padStart(24, "0"), name: "やや傷や汚れあり" },
  { id: "3".padStart(24, "0"), name: "傷や汚れあり" },
  { id: "4".padStart(24, "0"), name: "全体的に状態が悪い" },
];

/** 配送料の負担 */
export const POSTAGE_IS_INCLUDED = [
  { id: 1, name: "送料込み(出品者負担)" },
  { id: 0, name: "着払い(購入者負担)" },
];
/** 配送方法 */
export const SHIPPING_METHOD: ShippingMethod[] = [
  { id: "0".padStart(24, "0"), name: "未定", amount: null },
  { id: "1".padStart(24, "0"), name: "らくらくメルカリ便", amount: 500 },
  { id: "2".padStart(24, "0"), name: "ゆうメール", amount: 200 },
  { id: "3".padStart(24, "0"), name: "レターパック", amount: 500 },
  { id: "4".padStart(24, "0"), name: "普通郵便(定形、定形外)", amount: null },
  { id: "5".padStart(24, "0"), name: "クロネコヤマト", amount: 800 },
  { id: "6".padStart(24, "0"), name: "ゆうパック", amount: 800 },
  { id: "7".padStart(24, "0"), name: "クリックポスト", amount: 200 },
  { id: "8".padStart(24, "0"), name: "ゆうパケット", amount: 200 },
];
/** 配送日の目安 */
export const SHIPPING_DAYS: ShippingDays[] = [
  { id: "0".padStart(24, "0"), name: "1~2日で発送", maxDays: 2 },
  { id: "1".padStart(24, "0"), name: "2~3日で発送", maxDays: 3 },
  { id: "2".padStart(24, "0"), name: "4~7日で発送", maxDays: 7 },
];

/** 取引ステータス */
export const TRANSACTION_STATUS = {
  BEFORE_PAYMENT: 0, // 支払い前
  COMPLETE_PAYMENT: 1, // 支払い完了
  SENT: 2, // 発送済み
  RECEIVED: 3, // 受け取り完了
  CANCELLED: 4, // 取引キャンセル
} as const;

/** 取引評価選択肢 */
export const TRANSACTION_RATING_OPTION: TransactionRatingOption[] = [
  { id: "1".padStart(24, "0"), name: "良い", rating: 1 },
  { id: "2".padStart(24, "0"), name: "普通", rating: 0 },
  { id: "3".padStart(24, "0"), name: "悪い", rating: -1 },
];