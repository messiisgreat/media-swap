import { type ShippingMethodKey } from "@/constants/item";

const DELIVERY_SERVICE_PROVIDER_URL = {
  JAPAN_POST: "https://www.post.japanpost.jp/receive/tracking/result.php?code=",
  YAMATO_TRANSPORT:
    "http://jizen.kuronekoyamato.co.jp/jizen/servlet/crjz.b.NQ0010?id=",
} as const satisfies Record<string, `https://${string}` | `http://${string}`>;

type DeliveryServiceProviderURL =
  (typeof DELIVERY_SERVICE_PROVIDER_URL)[keyof typeof DELIVERY_SERVICE_PROVIDER_URL];

export const SHIPPING_METHOD_DELIVERY_SERVICE_PROVIDER_URL = {
  0: null,
  1: DELIVERY_SERVICE_PROVIDER_URL.JAPAN_POST,
  2: DELIVERY_SERVICE_PROVIDER_URL.JAPAN_POST,
  3: DELIVERY_SERVICE_PROVIDER_URL.JAPAN_POST,
  4: DELIVERY_SERVICE_PROVIDER_URL.YAMATO_TRANSPORT,
  5: DELIVERY_SERVICE_PROVIDER_URL.JAPAN_POST,
  6: DELIVERY_SERVICE_PROVIDER_URL.JAPAN_POST,
  7: DELIVERY_SERVICE_PROVIDER_URL.JAPAN_POST,
  99: null,
} as const satisfies Record<
  ShippingMethodKey,
  DeliveryServiceProviderURL | null
>;

/**
 * 追跡番号から配送状況確認ページのURLを生成する
 * @param trackingNumber 追跡番号
 * @param shippingMethodCode 型絞り込み済みの配送方法コード
 */
export const generateTrackingURL = (
  trackingNumber: string,
  shippingMethodCode: ShippingMethodKey,
): `${DeliveryServiceProviderURL}${string}` | null => {
  const url = SHIPPING_METHOD_DELIVERY_SERVICE_PROVIDER_URL[shippingMethodCode];
  if (!url) return null;
  return `${url}${trackingNumber}`;
};
