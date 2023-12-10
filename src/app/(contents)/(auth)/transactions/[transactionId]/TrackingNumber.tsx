"use client";

import {
  DELIVERY_SERVICE_PROVIDER_URLS,
  SHIPPING_METHOD_DELIVERY_SERVICE_PROVIDER_URLS,
} from "@/constants/listing";
import { TextLink } from "@/ui";
import { type Transaction } from "@prisma/client";

type Props = {
  trackingNumber: Transaction["trackingNumber"];
  shippingMethodId: string;
};

/**
 * 入力された送り状番号を表示する
 * 表示された送り状番号を押下することで、選択した配送業者の配達状況確認ページに遷移
 */
export const TrackingNumber = ({ trackingNumber, shippingMethodId }: Props) => {
  // 配送方法によって配達状況確認ページを変更する
  const deliveryServiceProviderUrl =
    SHIPPING_METHOD_DELIVERY_SERVICE_PROVIDER_URLS[
      Number(
        shippingMethodId,
      ) as keyof typeof SHIPPING_METHOD_DELIVERY_SERVICE_PROVIDER_URLS
    ] == DELIVERY_SERVICE_PROVIDER_URLS.YAMATO_TRANSPORT
      ? `${DELIVERY_SERVICE_PROVIDER_URLS.YAMATO_TRANSPORT}${trackingNumber}`
      : `${DELIVERY_SERVICE_PROVIDER_URLS.JAPAN_POST}?number=${trackingNumber}`;
  return (
    <div className="flex items-center">
      <span className="mr-4 font-bold">送り状番号:</span>
      <TextLink
        href={deliveryServiceProviderUrl}
        rel="noopener noreferrer"
        className="font-medium"
      >
        {trackingNumber}
      </TextLink>
    </div>
  );
};
