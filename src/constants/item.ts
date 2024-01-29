// 出品商品に関する定数
// フォームで取り扱う値は、数字やbooleanであっても文字列型で扱うため、keyも文字列型で定義している

import { generateKeyGuard } from "@/utils/typeGuard";

/** 商品の状態 */
export const CONDITION = {
  0: "新品または未使用",
  1: "目立った傷や汚れなし",
  2: "やや傷や汚れあり",
  3: "傷や汚れあり",
  4: "全体的に状態が悪い",
} as const satisfies Record<string, string>;

/** 配送料の負担 */
export const IS_SHIPPING_INCLUDED = {
  0: "着払い(購入者負担)",
  1: "送料込み(出品者負担)",
} as const satisfies Record<string, string>;

/** 配送方法 */
export const SHIPPING_METHOD = {
  0: "未定",
  1: "ゆうメール",
  2: "レターパック",
  3: "普通郵便(定形、定形外)",
  4: "クロネコヤマト",
  5: "ゆうパック",
  6: "クリックポスト",
  7: "ゆうパケット",
  99: "その他",
} as const satisfies Record<string, string>;

export type ShippingMethodKey = keyof typeof SHIPPING_METHOD;

/** 配送方法（その他） */
export const SHIPPING_ID = {
  OTHER: "99",
} as const;

/** 配送日の目安 */
export const SHIPPING_DAYS = {
  0: "1~2日で発送",
  1: "2~3日で発送",
  2: "4~7日で発送",
} as const satisfies Record<string, string>;

/** 取引ステータス */
export const TRANSACTION_STATUS = {
  BEFORE_PAYMENT: 0, // 支払い前
  COMPLETE_PAYMENT: 1, // 支払い完了
  SENT: 2, // 発送済み
  RECEIVED: 3, // 受け取り完了
  COMPLETED: 98, // 取引完了
  CANCELLED: 99, // 取引キャンセル
} as const satisfies Record<string, number>;

type TransactionStatusKey = keyof typeof TRANSACTION_STATUS;

export type TransactionStatusValue =
  (typeof TRANSACTION_STATUS)[TransactionStatusKey];

/** 取引評価選択肢 */
export const TRANSACTION_RATING_OPTION = {
  1: "良い",
  0: "普通",
  "-1": "悪い",
} as const;

/** サービス手数料 */
export const SERVICE_CHARGE = 0.05;

/** 販売手数料率 */
export const HANDING_CHARGE_RATE = 0.15;

/** 価格設定の最大値と最小値 */
export const PRICE_LIMIT = {
  MAX: 500000,
  MIN: 300,
} as const;

export const isConditionKey = generateKeyGuard(CONDITION);
export const isShippingMethodKey = generateKeyGuard(SHIPPING_METHOD);
export const isShippingDaysKey = generateKeyGuard(SHIPPING_DAYS);
