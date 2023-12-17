"use client";

import { useCallback } from "react";

import { useFormActionModal } from "@/features/modal";
import { H } from "@/ui/structure/H";
import { Select, Textarea } from "@/ui/form";
import {
  cancellationBuyerReasons,
  // cancellationSellerReasons,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/sellerInfo/types";
/**
 * 取引キャンセル用のモーダル
 * @returns
 */
export const useCancelModal = () => {
  const action = async () => {
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  };
  const { handleOpen, FormActionModal } = useFormActionModal(action, "送信");

  const CancelModal = useCallback(
    () => (
      <FormActionModal>
        <H className="text-center text-lg font-bold">取引キャンセルの問合せ</H>
        <p className="whitespace-normal">
          以下の項目に取引キャンセルの内容を入力してください
        </p>
        <Select
          labelText="お問い合わせ種別"
          id="category"
          name="category"
          options={cancellationBuyerReasons}
          required
        />
        <Textarea
          labelText="お問い合わせ内容"
          id="body"
          placeholder="お問い合わせ内容を入力してください。"
          name="body"
          required
          maxLength={4000}
        />
      </FormActionModal>
    ),
    [FormActionModal],
  );

  return [handleOpen, CancelModal] as const;
};
