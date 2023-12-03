import DeliveryContents from "@/features/itemsFormContents/deliveryContents";
import DetailsContents from "@/features/itemsFormContents/detailsContents";
import React from "react";

type Props = {
  detailsContentsProps: React.ComponentProps<typeof DetailsContents>;
  deliveryContentsProps: React.ComponentProps<typeof DeliveryContents>;
};

/**
 * 商品の詳細情報と配送情報を入力するフォームのコンポーネント
 *
 * @param {object} props - コンポーネントのプロパティ
 * @param {object} props.detailsContentsProps - DetailsContentsコンポーネントのプロパティ
 * @param {object} props.deliveryContentsProps - DeliveryContentsコンポーネントのプロパティ
 * @returns {React.Element} 商品の詳細情報と配送情報を入力するフォームのエレメント
 */
export const ItemsFormContents = ({
  detailsContentsProps,
  deliveryContentsProps,
}: Props) => {
  return (
    <>
      <DetailsContents
        productName={detailsContentsProps.productName}
        productConditionId={detailsContentsProps.productConditionId}
        description={detailsContentsProps.description}
        tags={detailsContentsProps.tags}
        selectedTags={detailsContentsProps.selectedTags}
      />
      <DeliveryContents
        postageIsIncluded={deliveryContentsProps.postageIsIncluded}
        shippingMethodId={deliveryContentsProps.shippingMethodId}
        shippingDaysId={deliveryContentsProps.shippingDaysId}
        price={deliveryContentsProps.price}
      />
    </>
  );
};
