import { type ZipCloudResult } from "@/features/addressFormContents/addressSearchButton/types";
import { type RefObject } from "react";

/**
 * 各input,selectの参照を受け取り、郵便番号APIのレスポンスから住所を設定する
 * @param prefectureRef 都道府県のRef
 * @param cityRef 市区町村のRef
 * @param addressLine1Ref 町域・番地のRef
 * @param response 郵便番号APIのレスポンス
 */
export const setAddressValue = (
  prefectureRef: RefObject<HTMLSelectElement>,
  cityRef: RefObject<HTMLInputElement>,
  addressLine1Ref: RefObject<HTMLInputElement>,
  response: ZipCloudResult,
) => {
  const {
    address1: prefecture,
    address2: city,
    address3: addressLine1,
  } = response;

  const prefectureSelect = prefectureRef.current;
  const cityInput = cityRef.current;
  const addressLine1Input = addressLine1Ref.current;

  if (prefectureSelect && cityInput && addressLine1Input) {
    // この方法以外で書き換えできないの使用
    // eslint-disable-next-line functional/immutable-data
    prefectureSelect.value = prefecture;
    // eslint-disable-next-line functional/immutable-data
    cityInput.value = city;
    // eslint-disable-next-line functional/immutable-data
    addressLine1Input.value = addressLine1;
  }
};
