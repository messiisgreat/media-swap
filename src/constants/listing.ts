import {
  type ProductCondition,
  type ShippingDays,
  type ShippingMethod,
  type TransactionRatingOption,
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

/** 取引ステータスIDから見るボタンの表示ステータス */
export const TRANSACTION_BUTTON_STATUS = {
  0: "支払完了",
  1: "発送完了",
  2: "受取完了",
  3: "取引評価",
  4: "取引キャンセル",
} as const;

/** 取引評価選択肢 */
export const TRANSACTION_RATING_OPTION: TransactionRatingOption[] = [
  { id: "1".padStart(24, "0"), name: "良い", rating: 1 },
  { id: "2".padStart(24, "0"), name: "普通", rating: 0 },
  { id: "3".padStart(24, "0"), name: "悪い", rating: -1 },
];

/** サービス手数料 */
export const SERVICE_CHARGE = 0.05;

/** 販売手数料率 */
export const HANDING_CHARGE_RATE = 0.15;

/** 配送状況確認ページのURL */
export const DELIVERY_SERVICE_PROVIDER_URLS = {
  JAPAN_POST: "https://www.post.japanpost.jp/receive/tracking/result.php?code=",
  YAMATO_TRANSPORT:
    "http://jizen.kuronekoyamato.co.jp/jizen/servlet/crjz.b.NQ0010?id=",
} as const;

export const SHIPPING_METHOD_DELIVERY_SERVICE_PROVIDER_URLS = {
  2: DELIVERY_SERVICE_PROVIDER_URLS.JAPAN_POST,
  3: DELIVERY_SERVICE_PROVIDER_URLS.JAPAN_POST,
  4: DELIVERY_SERVICE_PROVIDER_URLS.JAPAN_POST,
  5: DELIVERY_SERVICE_PROVIDER_URLS.YAMATO_TRANSPORT,
  6: DELIVERY_SERVICE_PROVIDER_URLS.JAPAN_POST,
  7: DELIVERY_SERVICE_PROVIDER_URLS.JAPAN_POST,
  8: DELIVERY_SERVICE_PROVIDER_URLS.JAPAN_POST,
} as const;
