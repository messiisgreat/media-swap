"use client";

import { useAddressModal } from "@/app/(contents)/(auth)/listing/_components/listingForm/AddressFormModal";
import { listingItem } from "@/app/(contents)/(auth)/listing/_components/listingForm/actions";
import { ItemsFormContents } from "@/features/itemsFormContents";
import { initialProductFormValues } from "@/features/itemsFormContents/types";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useForm, type FormOptions } from "@/ui/form/hooks";
import { type Address, type Tag } from "@prisma/client";
import { useEffect } from "react";

type Props = {
  /** ユーザー名 */
  userName: string;
  /** タグの配列 */
  tags: Tag[];
  /** 初期値の住所 */
  address: Omit<Address, "id" | "userId"> | null;
};

/**
 *
 * 購入ボタン用のモーダル
 * @param address 住所
 * @returns 購入ボタンのモーダルを開く関数とモーダルのコンポーネント
 */
export const ListingForm = ({ userName, tags, address }: Props) => {
  const formOptions: FormOptions = {
    authenticationRequired: true,
    showToast: true,
  };
  const { Form, values } = useForm(
    listingItem,
    initialProductFormValues,
    formOptions,
  );

  const handleOpenModal = useAddressModal(address, userName);

  useEffect(() => {
    if (!address) {
      handleOpenModal();
    }
  }, [address, handleOpenModal]);

  return (
    <Form className="grid grid-cols-2 gap-3 [&>*]:col-span-2 [&>button]:col-span-1">
      <ItemsFormContents {...{ ...values, tags }} />
      <SubmitButton outline name="isPublic" value="false">
        下書きに保存する
      </SubmitButton>
      <SubmitButton name="isPublic" value="true">
        出品する
      </SubmitButton>
    </Form>
  );
};
