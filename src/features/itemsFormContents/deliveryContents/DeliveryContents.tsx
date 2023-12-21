"use client";

import {
  IS_SHIPPING_INCLUDED,
  PRICE_LIMIT,
  SHIPPING_DAYS,
  SHIPPING_ID,
  SHIPPING_METHOD,
} from "@/constants/item";
import { PriceInput } from "@/features/itemsFormContents/deliveryContents/PriceInput";
import { Input, Select } from "@/ui/form";
import { TitleUnderbar } from "@/ui/structure";
import { useCallback, useState, type ChangeEvent } from "react";

type Props = {
  /** 配送料の負担情報 */
  isShippingIncluded: string;
  /** 配送方法ID */
  shippingMethodCode: string;
  /** 発送までの日数ID */
  shippingDaysCode: string;
  /** 配送方法（その他） */
  shippingMethodCustom?: string;
  /** 価格 */
  price: string;
};

/**
 * 配送情報を入力するフォームのコンポーネント
 * @returns 配送情報を入力するフォームのエレメント
 */
export const DeliveryContents = ({
  isShippingIncluded,
  shippingMethodCode,
  shippingDaysCode,
  shippingMethodCustom,
  price,
}: Props) => {
  const [isOther, setIsOther] = useState(false);
  const handleChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const isOther = e.currentTarget.value === SHIPPING_ID.OTHER;
    if (!isOther) return;
    setIsOther(isOther);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 [&>*]:col-span-2 [&>button]:col-span-1">
      <TitleUnderbar title="配送について" />
      <Select
        name="isShippingIncluded"
        labelText="配送料の負担"
        options={IS_SHIPPING_INCLUDED}
        defaultValue={isShippingIncluded}
      />
      <Select
        name="shippingMethodCode"
        labelText="配送の方法"
        options={SHIPPING_METHOD}
        defaultValue={shippingMethodCode}
        onChange={handleChange}
      />
      {isOther && (
        <Input
          name="shippingMethodCustom"
          labelText="配送の方法（その他）"
          type="text"
          placeholder="速達サービス"
          required
          defaultValue={shippingMethodCustom}
        />
      )}
      <Select
        name="shippingDaysCode"
        labelText="発送までの日数"
        options={SHIPPING_DAYS}
        defaultValue={shippingDaysCode}
      />
      <PriceInput
        labelText={`販売価格(￥${new Intl.NumberFormat().format(
          PRICE_LIMIT.MIN,
        )}〜${new Intl.NumberFormat().format(PRICE_LIMIT.MAX)})`}
        name="price"
        required
        prefix="¥"
        defaultValue={price}
      />
    </div>
  );
};
