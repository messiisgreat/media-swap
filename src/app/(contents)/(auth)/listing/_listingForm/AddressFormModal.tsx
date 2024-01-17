"use client";

import { useCallback } from "react";

import { useFormActionModal } from "@/ui/modal";
import { useSetModal } from "@/ui/modal/modalProvider/ModalProvider";

import { PREFECTURE_OBJ } from "@/constants/prefectures";
import { Input, Select } from "@/ui/form";
import { objToAssociative } from "@/utils/converter";
import { type Address } from "@prisma/client";

import { addressFormAction } from "@/app/(contents)/(auth)/listing/_listingForm/actions";
import { initialAddressFormValues } from "@/app/(contents)/(auth)/mypage/settings/address/type";
import { useForm } from "@/ui/form/hooks";


/**
 *
 * 購入ボタン用のモーダル
 * @param address 住所
 * @returns 購入ボタンのモーダルを開く関数とモーダルのコンポーネント
 * @todo クーポンを使う場合の処理を追加する場合、formでselect要素を使って実装する。
 */
export const useAddressModal = (address: Omit<Address, "id" | "userId"> | null) => {
  const initialValues = {
    values: address
      ? {
          ...address,
          addressLine2: address.addressLine2 ?? "",
          verificationCode: "",
        }
      : initialAddressFormValues.values,
  };
  const { action, register } = useForm(addressFormAction, initialValues, {
    hasAuth: true,
    hasToaster: true,
  });

  const { handleOpen, FormActionModal } = useFormActionModal(action, "更新");

  const PurchaseModal = useCallback(
    () => (
      <FormActionModal>
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
      </FormActionModal>
    ),
    [register, FormActionModal],
  );

  useSetModal(<PurchaseModal />);
  return handleOpen;
};
