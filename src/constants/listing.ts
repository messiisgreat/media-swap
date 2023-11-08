import {
  ProductCondition,
  ShippingDays,
  ShippingMethod,
  TransactionRatingOption,
  TransactionStatus,
} from "@prisma/client";

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
export const TRANSACTION_STATUS: TransactionStatus[] = [
  { id: "0".padStart(24, "0"), name: "支払い前", step: 0 },
  { id: "1".padStart(24, "0"), name: "支払い完了", step: 1 },
  { id: "2".padStart(24, "0"), name: "発送済み", step: 2 },
  { id: "3".padStart(24, "0"), name: "受け取り完了", step: 3 },
  { id: "4".padStart(24, "0"), name: "取引キャンセル", step: 4 },
];

/** 取引評価選択肢 */
export const TRANSACTION_RATING_OPTION: TransactionRatingOption[] = [
  { id: "1".padStart(24, "0"), name: "良い", rating: 1 },
  { id: "2".padStart(24, "0"), name: "普通", rating: 0 },
  { id: "3".padStart(24, "0"), name: "悪い", rating: -1 },
];
