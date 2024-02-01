"use client";

import { useCallback } from "react";

import { useFormActionModal } from "@/ui/modal";
import { useSetModal } from "@/ui/modal/modalProvider";

import { type Address } from "@prisma/client";

import { addressFormAction } from "@/app/(contents)/(auth)/listing/_components/listingForm/actions";
import { getInitialValues } from "@/app/(contents)/(auth)/mypage/settings/address/_components/addressForm/utils";
import { AddressFormContents } from "@/features/addressFormContents";
import { useForm, type FormOptions } from "@/ui/form/hooks";

/**
 *
 * 購入ボタン用のモーダル
 * @param address 住所
 * @param userName ユーザー名
 * @returns 購入ボタンのモーダルを開く関数とモーダルのコンポーネント
 */
export const useAddressModal = (
  address: Omit<Address, "id" | "userId"> | null,
  userName: string,
) => {
  const initialValues = getInitialValues(address, userName);
  const formOptions: FormOptions = {
    authenticationRequired: true,
    showToast: true,
  };
  const { register, action } = useForm(
    addressFormAction,
    initialValues,
    formOptions,
  );
  const { handleOpen, FormActionModal } = useFormActionModal(action, "更新");

  const PurchaseModal = useCallback(
    () => (
      <FormActionModal>
        <AddressFormContents register={register} />
      </FormActionModal>
    ),
    [register, FormActionModal],
  );

  useSetModal(<PurchaseModal />);
  return handleOpen;
};
