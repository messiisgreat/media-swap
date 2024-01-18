"use client";

import { addressFormAction } from "@/app/(contents)/(auth)/mypage/settings/address/actions";
import { getInitialValues } from "@/app/(contents)/(auth)/mypage/settings/address/utils";
import { PREFECTURE_OBJ } from "@/constants/prefectures";
import { Input, Select } from "@/ui/form";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useForm } from "@/ui/form/hooks";
import { objToAssociative } from "@/utils/converter";
import { type Address } from "@prisma/client";

type Props = {
  /** 初期値の住所 */
  address: Omit<Address, "id" | "userId"> | null;
};

/**
 * ユーザーの住所を変更するフォーム
 * @returns form > Input, Select, SubmitButton
 */
export const AddressForm = ({ address }: Props) => {
  const initialValues = getInitialValues(address);
  const formOptions = {
    authenticationRequired: true,
    showToast: true,
  };
  const { Form, register } = useForm(
    addressFormAction,
    initialValues,
    formOptions,
  );

  return (
    <Form className="grid gap-3">
      <Input
        {...register("postalCode")}
        labelText="郵便番号"
        autoComplete="shipping postal-code"
        placeholder="例: 1234567"
      />
      <Select
        {...register("prefecture")}
        labelText="都道府県"
        options={objToAssociative(PREFECTURE_OBJ)}
        autoComplete="shipping address-level1"
      />
      <Input
        {...register("city")}
        labelText="市区町村 (例: 川崎市川崎区)"
        type="text"
        autoComplete="shipping address-level2"
        placeholder="川崎市川崎区"
      />
      <Input
        {...register("addressLine1")}
        labelText="町域・番地(例: 旭町1-1)"
        type="text"
        autoComplete="shipping address-line1"
        placeholder="旭町1-1"
      />
      <Input
        {...register("addressLine2")}
        labelText="建物名など(例: ○○マンション101号)"
        type="text"
        autoComplete="shipping address-line2"
        placeholder="○○マンション101号"
      />
      <Input
        {...register("phoneNumber")}
        labelText="電話番号"
        type="tel"
        autoComplete="shipping phone-number"
        placeholder="09000000000"
      />
      <SubmitButton>更新</SubmitButton>
    </Form>
  );
};
