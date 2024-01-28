"use cilent";

import { type ZipCloudResponse } from "@/app/(contents)/(auth)/mypage/settings/address/_components/addressForm/addressSearchButton/types";
import { setAddressValue } from "@/app/(contents)/(auth)/mypage/settings/address/_components/addressForm/addressSearchButton/utils";
import { AddressFormSchema } from "@/app/(contents)/(auth)/mypage/settings/address/_components/addressForm/type";
import { Button } from "@/ui";
import { fetchResult } from "@/utils/fetcher";
import { useCallback, useState, type RefObject } from "react";
import toast from "react-hot-toast";

type AddressSearchButtonProps = {
  postalCodeRef: RefObject<HTMLInputElement>;
  prefectureRef: RefObject<HTMLSelectElement>;
  cityRef: RefObject<HTMLInputElement>;
  addressLine1Ref: RefObject<HTMLInputElement>;
};

/**
 * 郵便番号APIから取得した住所をフォームに入力するボタン
 * バリデーションエラーがある場合はエラーを表示する
 * APIからのレスポンス待機中はボタンを無効化する
 */
export const AddressSearchButton = ({
  postalCodeRef,
  prefectureRef,
  cityRef,
  addressLine1Ref,
  ...props
}: AddressSearchButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);

    const postalCode = postalCodeRef.current?.value;
    const postalCodeSchema = AddressFormSchema.shape.postalCode;
    const validated = postalCodeSchema.safeParse(postalCode);

    if (!validated.success) {
      const error = validated.error.flatten().formErrors[0];
      error && toast.error(error);
      setIsLoading(false);
      return;
    }

    try {
      const responseResult = await fetchResult<ZipCloudResponse>(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`,
      );
      if (responseResult.isFailure) {
        toast.error("住所の取得に失敗しました");
        return;
      }

      const zipcloudResults = responseResult.value.results;
      if (!zipcloudResults || zipcloudResults.length === 0) {
        toast.error("住所が見つかりませんでした");
        return;
      }

      const response = zipcloudResults[0];
      if (!response) {
        toast.error("住所が見つかりませんでした");
        return;
      }

      setAddressValue(prefectureRef, cityRef, addressLine1Ref, response);
    } catch (error) {
      toast.error("住所の取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  }, [addressLine1Ref, cityRef, postalCodeRef, prefectureRef]);

  return (
    <Button onClick={handleSearch} disabled={isLoading} {...props}>
      住所検索
    </Button>
  );
};
