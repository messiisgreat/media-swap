import { generateTrackingURL } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/trackingNumber/utils";
import { type ShippingMethodKey } from "@/constants/item";
import { TextLink } from "@/ui";
import { type Transaction } from "@prisma/client";

type Props = {
  trackingNumber: Transaction["trackingNumber"];
  shippingMethodCode: ShippingMethodKey;
};

/**
 * 入力された送り状番号を表示する
 * 表示された送り状番号を押下することで、選択した配送業者の配達状況確認ページに遷移
 */
export const TrackingNumber = ({
  trackingNumber,
  shippingMethodCode,
}: Props) => {
  if (!trackingNumber) return <span>追跡番号の登録がありません</span>;
  const deliveryServiceProviderUrl = generateTrackingURL(
    trackingNumber,
    shippingMethodCode,
  );
  return (
    <div className="flex items-center">
      <span className="mr-4 font-bold">送り状番号:</span>
      {deliveryServiceProviderUrl ? (
        <TextLink
          href={deliveryServiceProviderUrl}
          target="_blank"
          className="font-medium"
        >
          {trackingNumber}
        </TextLink>
      ) : (
        <span className="font-medium">{trackingNumber}</span>
      )}
    </div>
  );
};
