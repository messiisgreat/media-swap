"use client";

import { useCallback } from "react";

import { useFormActionModal } from "@/features/modal";
import { H } from "@/ui/structure/H";

/**
 * 取引キャンセル用のモーダル
 * @returns 
 */
export const useCancelModal = () => {

  const action = async () => {
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  }
  const { handleOpen, FormActionModal } = useFormActionModal(action, "送信");

  const CancelModal = useCallback(
    () => (
      <FormActionModal>
        <H className="text-center text-lg font-bold">取引キャンセルの問合せ</H>
        <p className="py-2">以下の項目に取引キャンセルの内容を入力してください</p>
        <dl className="mb-4 grid grid-cols-2 gap-2 " role="alert">
        <div>テスト</div>
        </dl>
      </FormActionModal>
    ), [FormActionModal]);

  return [handleOpen, CancelModal] as const;
};
