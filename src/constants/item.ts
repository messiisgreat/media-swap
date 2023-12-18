/** 商品の状態 */
export const PRODUCT_CONDITION = {
  0: "新品または未使用",
  1: "目立った傷や汚れなし",
  2: "やや傷や汚れあり",
  3: "傷や汚れあり",
  4: "全体的に状態が悪い",
} as const;

/** 配送料の負担 */
export const POSTAGE_IS_INCLUDED = {
  0: "着払い(購入者負担)",
  1: "送料込み(出品者負担)",
} as const;

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
} as const;

/** 配送方法（その他） */
export const SHIPPING_ID = {
  OTHER: "99",
} as const;

/** 配送状況確認ページのURL */
export const DELIVERY_SERVICE_PROVIDER_URL = {
  JAPAN_POST: "https://www.post.japanpost.jp/receive/tracking/result.php?code=",
  YAMATO_TRANSPORT:
    "http://jizen.kuronekoyamato.co.jp/jizen/servlet/crjz.b.NQ0010?id=",
} as const;

export const SHIPPING_METHOD_DELIVERY_SERVICE_PROVIDER_URL = {
  1: DELIVERY_SERVICE_PROVIDER_URL.JAPAN_POST,
  2: DELIVERY_SERVICE_PROVIDER_URL.JAPAN_POST,
  3: DELIVERY_SERVICE_PROVIDER_URL.JAPAN_POST,
  4: DELIVERY_SERVICE_PROVIDER_URL.YAMATO_TRANSPORT,
  5: DELIVERY_SERVICE_PROVIDER_URL.JAPAN_POST,
  6: DELIVERY_SERVICE_PROVIDER_URL.JAPAN_POST,
  7: DELIVERY_SERVICE_PROVIDER_URL.JAPAN_POST,
} as const;

/** 配送日の目安 */
export const SHIPPING_DAYS = {
  0: "1~2日で発送",
  1: "2~3日で発送",
  2: "4~7日で発送",
} as const;

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
};