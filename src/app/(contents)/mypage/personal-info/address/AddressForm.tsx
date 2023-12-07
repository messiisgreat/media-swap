"use client";

import { useFormState } from "react-dom";

import { addressFormAction } from "@/app/(contents)/mypage/personal-info/address/actions";
import { initialAddressFormValues } from "@/app/(contents)/mypage/personal-info/address/type";
import { PREFECTURE_OBJ } from "@/constants/prefectures";
import { Input, Select } from "@/ui/form";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useFormMessageToaster } from "@/ui/form/hooks";
import { useVerify } from "@/ui/form/securityVerifier/hooks";
import { objToAssociative } from "@/utils/converter";

/**
 * 住所フォーム
 */
export const AddressForm = () => {
  const [state, dispatch] = useFormState(
    addressFormAction,
    initialAddressFormValues,
  );
  const getVerificationCode = useVerify();
  useFormMessageToaster(state);

  const action = async (f: FormData) => {
    const verificationCode = await getVerificationCode();
    f.append("verificationCode", verificationCode || "");
    dispatch(f);
  };

  return (
    <form action={action} className="grid gap-3">
      <Input
        name="postalCode"
        labelText="郵便番号"
        autoComplete="shipping postal-code"
        placeholder="例: 1234567"
        defaultValue={state.values.postalCode}
      />
      <Select
        name="prefecture"
        labelText="都道府県"
        options={objToAssociative(PREFECTURE_OBJ)}
        autoComplete="shipping address-level1"
        defaultValue={state.values.prefecture}
      />
      <Input
        name="city"
        labelText="市区町村 (例: 川崎市川崎区)"
        type="text"
        autoComplete="shipping address-level2"
        placeholder="川崎市川崎区"
        defaultValue={state.values.city}
      />
      <Input
        name="addressLine1"
        labelText="町域・番地(例: 旭町1-1)"
        type="text"
        autoComplete="shipping address-line1"
        placeholder="旭町1-1"
        defaultValue={state.values.addressLine1}
      />
      <Input
        name="addressLine2"
        labelText="建物名など(例: ○○マンション101号)"
        type="text"
        autoComplete="shipping address-line2"
        placeholder="○○マンション101号"
        defaultValue={state.values.addressLine2}
      />
      <Input
        name="phoneNumber"
        labelText="電話番号"
        type="tel"
        autoComplete="shipping phone-number"
        placeholder="09000000000"
        defaultValue={state.values.phoneNumber}
      />
      <SubmitButton>更新</SubmitButton>
    </form>
  );
};
