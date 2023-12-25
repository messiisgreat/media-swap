import React from "react";

import DeliveryContents from "@/features/itemsFormContents/deliveryContents";
import DetailsContents from "@/features/itemsFormContents/detailsContents";

type Props = React.ComponentProps<typeof DetailsContents> &
  React.ComponentProps<typeof DeliveryContents>;

/**
 * 商品の詳細情報と配送情報を入力するフォームのコンポーネント
 *
 * @param props コンポーネントのプロパティ
 * @returns 商品の詳細情報と配送情報を入力するフォームのエレメント
 */
export const ItemsFormContents = (props: Props) => (
    <>
      <DetailsContents
        name={props.name}
        conditionCode={props.conditionCode}
        description={props.description}
        tags={props.tags}
        selectedTags={props.selectedTags}
      />
      <DeliveryContents
        isShippingIncluded={props.isShippingIncluded}
        shippingMethodCode={props.shippingMethodCode}
        shippingDaysCode={props.shippingDaysCode}
        shippingMethodCustom={props.shippingMethodCustom}
        price={props.price}
      />
    </>
  );
