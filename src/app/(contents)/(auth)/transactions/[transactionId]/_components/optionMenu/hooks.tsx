"use client";

import { sendCancelInquiry } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/sellerInfo/actions";
import {
  cancellationBuyerReasons,
  cancellationSellerReasons,
  initialCancellationFormValues,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/sellerInfo/types";
import { useSessionUser } from "@/app/_layout/provider/AuthProvider";
import { Select, Textarea } from "@/ui/form";
import { useForm, type FormOptions } from "@/ui/form/hooks";
import { useFormActionModal } from "@/ui/modal";
import { useSetModal } from "@/ui/modal/modalProvider";
import { H } from "@/ui/structure/H";
import { useCallback } from "react";

/**
 * 取引キャンセル用のモーダル
 * @param userType ユーザー種別
 * @returns
 */
export const useCancelModal = (userType: "buyer" | "seller") => {
  const formOptions: FormOptions = {
    authenticationRequired: true,
    showToast: true,
  };
  const { action, register } = useForm(
    sendCancelInquiry,
    initialCancellationFormValues,
    formOptions,
  );
  const { handleOpen, FormActionModal } = useFormActionModal(action, "送信");
  const sessionUser = useSessionUser();

  const options =
    userType === "buyer" ? cancellationBuyerReasons : cancellationSellerReasons;

  const CancelModal = useCallback(
    () => (
      <FormActionModal>
        <H className="text-center text-lg font-bold">取引キャンセルの問合せ</H>
        <p className="whitespace-normal">
          以下の項目に取引キャンセルの内容を入力してください
        </p>
        <Select
          labelText="お問い合わせ種別"
          options={options}
          required
          {...register("category")}
        />
        <Textarea
          labelText="お問い合わせ内容"
          placeholder="お問い合わせ内容を入力してください。"
          required
          {...register("body")}
        />
        <input
          type="hidden"
          {...register("name")}
          defaultValue={sessionUser?.name ?? ""}
        />
        <input
          type="hidden"
          {...register("email")}
          defaultValue={sessionUser?.email ?? ""}
        />
      </FormActionModal>
    ),
    [FormActionModal, options, register, sessionUser?.email, sessionUser?.name],
  );

  useSetModal(<CancelModal />);

  return handleOpen;
};
