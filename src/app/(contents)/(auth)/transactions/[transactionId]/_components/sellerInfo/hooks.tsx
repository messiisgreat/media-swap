"use client";

import { useCallback } from "react";
import { useFormActionModal } from "@/features/modal";
import { H } from "@/ui/structure/H";
import { Select, Textarea } from "@/ui/form";
import {
  initialCancellationFormValues,
  cancellationBuyerReasons,
  cancellationSellerReasons,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/sellerInfo/types";
import { useFormState } from "react-dom";
import { useVerify } from "@/ui/form/securityVerifier/hooks";
import { useFormMessageToaster } from "@/ui/form/hooks";
import { sendCancelInquiry } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/sellerInfo/actions";
import { type Session } from "next-auth";

type Props = {
  /** ユーザー情報 */
  sessionUser?: Session["user"];
  /** 購入者判定 */
  isBuyer?: boolean;
};

/**
 * 取引キャンセル用のモーダル
 * @param props - モーダルのプロパティ
 * @returns
 */
export const useCancelModal = (props: Props) => {
  const [state, dispatch] = useFormState(
    sendCancelInquiry,
    initialCancellationFormValues,
  );
  const getVerificationCode = useVerify();
  useFormMessageToaster(state);

  const action = async (f: FormData) => {
    const verificationCode = await getVerificationCode();
    f.append("name", props.sessionUser?.name as string);
    f.append("email", props.sessionUser?.email as string);
    f.append("verificationCode", verificationCode);
    dispatch(f);
  };
  const { handleOpen, FormActionModal } = useFormActionModal(action, "送信");

  const options = props.isBuyer ? cancellationBuyerReasons : cancellationSellerReasons;

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
          options={options}
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
    [FormActionModal, options],
  );

  return [handleOpen, CancelModal] as const;
};
