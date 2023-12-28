"use client";

import { useFormState } from "react-dom";

import { insertTrackingNumber } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/shippingNotification/actions";
import { initialTrackingNumberFormValues } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/shippingNotification/type";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/form";
import { useFormMessageToaster } from "@/ui/form/hooks";
import { useVerify } from "@/ui/form/securityVerifier/hooks";
import { useFormActionModal } from "@/ui/modal";
import { useSetModal } from "@/ui/modal/modalProvider/ModalProvider";
import { H } from "@/ui/structure/H";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type Props = {
  transactionId: string;
};

/**
 *送り状番号送信用
 */
export const ShippingNotification = ({ transactionId }: Props) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [state, dispatch] = useFormState(
    insertTrackingNumber,
    initialTrackingNumberFormValues,
  );
  const getVerificationCode = useVerify();
  useFormMessageToaster(state);

  const action = async (f: FormData) => {
    const verificationCode = await getVerificationCode();
    f.append("verificationCode", verificationCode);
    f.append("transactionId", transactionId);
    f.append("trackingNumber", inputRef.current?.value || "");
    dispatch(f);

    if (inputRef.current) inputRef.current.value = ""; //ページ更新時にフォームをクリアする
    router.push(`/transactions/${transactionId}`);
  };

  const { handleOpen, FormActionModal } = useFormActionModal(
    action,
    "送信する",
  );

  useSetModal(
    <FormActionModal>
      <H className="text-center text-lg font-bold">入力番号の確認</H>
      <p>この送り状番号で送信してもよろしいですか？</p>
      <div className="flex justify-center">
        <p className="mr-4 font-bold">送り状番号:</p>
        <p className="font-bold">{inputRef.current?.value}</p>
      </div>
    </FormActionModal>,
  );

  return (
    <>
      <Input
        type="number"
        placeholder="送り状番号を入力"
        className="h-10 w-full px-4"
        ref={inputRef}
      />
      <Button onClick={handleOpen}>送り状番号を送信</Button>
    </>
  );
};
