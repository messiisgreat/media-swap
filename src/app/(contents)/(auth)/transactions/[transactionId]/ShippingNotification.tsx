"use client";

import { useFormState } from "react-dom";

import { insertTrackingNumber } from "@/app/(contents)/(auth)/transactions/[transactionId]/actions";
import { initialTrackingNumberFormValues } from "@/app/(contents)/(auth)/transactions/[transactionId]/type";
import { SHIPPING_METHOD_DELIVERY_SERVICE_PROVIDER_URLS } from "@/constants/listing";
import { useFormActionModal } from "@/features/modal";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/form";
import { useFormMessageToaster } from "@/ui/form/hooks";
import { useVerify } from "@/ui/form/securityVerifier/hooks";
import { H } from "@/ui/structure/H";
import { type Transaction } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type Props = {
  transactionId: string;
  trackingNumber: Transaction["trackingNumber"];
  shippingMethodId: string;
};

/**
 *送り状番号送信用
 */
export const ShippingNotification = ({
  transactionId,
  trackingNumber,
  shippingMethodId,
}: Props) => {
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
  return (
    <>
      <FormActionModal>
        <H className="text-center text-lg font-bold">入力番号の確認</H>
        <p>この送り状番号で送信してもよろしいですか？</p>
        <div className="flex justify-center">
          <p className="mr-4 font-bold">送り状番号:</p>
          <p className="font-bold">{inputRef.current?.value}</p>
        </div>
      </FormActionModal>
      <Input
        type="number"
        placeholder="送り状番号を入力"
        className="h-10 w-full px-4"
        ref={inputRef}
      />
      {trackingNumber && (
        <div className="flex items-center">
          <span className="mr-4 font-bold">送り状番号:</span>
          <a
            href={
              SHIPPING_METHOD_DELIVERY_SERVICE_PROVIDER_URLS[
                Number(
                  shippingMethodId,
                ) as keyof typeof SHIPPING_METHOD_DELIVERY_SERVICE_PROVIDER_URLS
              ]
            }
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            {trackingNumber}
          </a>
        </div>
      )}
      <Button onClick={handleOpen}>送り状番号を送信</Button>
    </>
  );
};
