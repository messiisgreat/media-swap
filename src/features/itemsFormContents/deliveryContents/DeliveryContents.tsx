import {
  POSTAGE_IS_INCLUDED,
  SHIPPING_DAYS,
  SHIPPING_METHOD,
} from "@/constants/listing";
import { PriceInput } from "@/features/itemsFormContents/deliveryContents/PriceInput";
import { Select } from "@/ui/form";
import { TitleUnderbar } from "@/ui/structure";
import { objToAssociative } from "@/utils/converter";

type Props = {
  postageIsIncluded: string;
  shippingMethodId: string;
  shippingDaysId: string;
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
  price,
}: Props) => {
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
      />
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
