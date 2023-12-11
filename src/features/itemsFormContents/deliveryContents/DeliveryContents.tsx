import {
  POSTAGE_IS_INCLUDED,
  SHIPPING_DAYS,
  SHIPPING_ID,
  SHIPPING_METHOD,
} from "@/constants/listing";
import { PriceInput } from "@/features/itemsFormContents/deliveryContents/PriceInput";
import { Input, Select } from "@/ui/form";
import { TitleUnderbar } from "@/ui/structure";
import { objToAssociative } from "@/utils/converter";
import { useState } from "react";

type Props = {
  postageIsIncluded: string;
  shippingMethodId: string;
  shippingDaysId: string;
  shippingMethodCustom: string;
  price: string;
};

/**
 * 配送情報を入力するフォームのコンポーネント
 *
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} props.postageIsIncluded - 配送料の負担情報
 * @param {string} props.shippingMethodId - 配送方法ID
 * @param {string} props.shippingDaysId - 発送までの日数ID
 * @param {string} props.price - 価格
 * @returns {React.Element} 配送情報を入力するフォームのエレメント
 */
export const DeliveryContents = ({
  postageIsIncluded,
  shippingMethodId,
  shippingDaysId,
  shippingMethodCustom,
  price,
}: Props) => {
  const [isOther, setIsOther] = useState(false);
  const handleChange = (targetValue: string) => {
    const isOther = targetValue === SHIPPING_ID.OTHER;
    setIsOther(isOther);
  };

  return (
    <div className="grid grid-cols-2 gap-3 [&>*]:col-span-2 [&>button]:col-span-1">
      <TitleUnderbar title="配送について" />
      <Select
        name="postageIsIncluded"
        labelText="配送料の負担"
        options={objToAssociative(POSTAGE_IS_INCLUDED)}
        defaultValue={postageIsIncluded}
      />
      <Select
        name="shippingMethodId"
        labelText="配送の方法"
        options={objToAssociative(SHIPPING_METHOD)}
        defaultValue={shippingMethodId}
        onChange={(e) => handleChange(e.target.value)}
      />
      {isOther && (
        <Input
          name="shippingMethodCustom"
          labelText="配送の方法（その他）"
          type="text"
          placeholder="速達サービス"
          defaultValue={shippingMethodCustom}
        />
      )}
      <Select
        name="shippingDaysId"
        labelText="発送までの日数"
        options={objToAssociative(SHIPPING_DAYS)}
        defaultValue={shippingDaysId}
      />
      <PriceInput
        labelText="販売価格(￥300〜10,000,000)"
        name="price"
        required
        prefix="¥"
        defaultValue={price}
      />
    </div>
  );
};
