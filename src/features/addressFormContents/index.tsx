"use client";
import { PREFECTURE_OBJ } from "@/constants/prefectures";
import { AddressSearchButton } from "@/features/addressFormContents/addressSearchButton";
import { type AddressFormValues } from "@/features/addressFormContents/type";
import { Input, Select } from "@/ui/form";
import { type useForm } from "@/ui/form/hooks";
import { objToAssociative } from "@/utils/converter";
import { useRef } from "react";

/**
 * 住所を入力するフォームの入力部分
 * @param register useFormフックから返されるregister関数
 */
export const AddressFormContents = ({
  register,
}: {
  register: ReturnType<typeof useForm<AddressFormValues>>["register"];
}) => {
  const PREFECTURE_OPTIONS = objToAssociative(PREFECTURE_OBJ);
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const prefectureRef = useRef<HTMLSelectElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const addressLine1Ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <Input
        labelText="名前"
        autoComplete="name"
        placeholder="諏訪　太郎"
        required
        {...register("name")}
      />
      <div className="grid grid-cols-[2fr_1fr] items-end gap-3 sm:grid-cols-[3fr_2fr]">
        <Input
          ref={postalCodeRef}
          type="number"
          labelText="郵便番号"
          autoComplete="postal-code"
          placeholder="1234567"
          className="w-full"
          inputMode="numeric"
          maxLength={7}
          required
          {...register("postalCode")}
        />
        <AddressSearchButton
          {...{ addressLine1Ref, cityRef, prefectureRef, postalCodeRef }}
        />
      </div>
      <Select
        ref={prefectureRef}
        labelText="都道府県"
        options={PREFECTURE_OPTIONS}
        autoComplete="address-level1"
        required
        {...register("prefecture")}
      />
      <Input
        ref={cityRef}
        labelText="市区町村 (例: 川崎市川崎区)"
        type="text"
        autoComplete="address-level2"
        placeholder="川崎市川崎区"
        required
        {...register("city")}
      />
      <Input
        ref={addressLine1Ref}
        labelText="町域・番地 (例: 旭町1-1)"
        type="text"
        autoComplete="address-line1"
        placeholder="旭町1-1"
        required
        {...register("addressLine1")}
      />
      <Input
        labelText="建物名など (例: ○○マンション101号)"
        type="text"
        autoComplete="address-line2"
        placeholder="○○マンション101号"
        {...register("addressLine2")}
      />
      <Input
        labelText="電話番号"
        type="tel"
        autoComplete="phone-number"
        placeholder="09000000000"
        required
        {...register("phoneNumber")}
      />
    </>
  );
};
