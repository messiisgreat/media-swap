"use client";

import { useAddressModal } from "@/app/(contents)/(auth)/listing/_listingForm/AddressFormModal";
import { listingItem } from "@/app/(contents)/(auth)/listing/_listingForm/actions";
import { ItemsFormContents } from "@/features/itemsFormContents";
import { initialProductFormValues } from "@/features/itemsFormContents/types";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useForm } from "@/ui/form/hooks";
import { type Address, type Tag } from "@prisma/client";
import { useEffect } from "react";

/**
 *
 * 購入ボタン用のモーダル
 * @param address 住所
 * @returns 購入ボタンのモーダルを開く関数とモーダルのコンポーネント
 * @todo クーポンを使う場合の処理を追加する場合、formでselect要素を使って実装する。
 */
export const ListingForm = ({
  tags,
  address,
}: {
  tags: Tag[];
  address: Omit<Address, "id" | "userId"> | null;
}) => {
  const formOptions = { hasAuthentication: true, showToast: true };
  const { Form, values } = useForm(
    listingItem,
    initialProductFormValues,
    formOptions,
  );

  const handleOpenModal = useAddressModal(address);

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
