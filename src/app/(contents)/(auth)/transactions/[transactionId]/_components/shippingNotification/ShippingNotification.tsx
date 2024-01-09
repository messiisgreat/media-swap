"use client";

import { useShippigNotificationModal } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/shippingNotification/hooks";
import { Button } from "@/ui/button";
import { Input } from "@/ui/form";
import { useRef } from "react";

type Props = {
  transactionId: string;
};

/**
 *送り状番号送信用
 */
export const ShippingNotification = ({ transactionId }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const value = inputRef.current?.value ?? "";

  const { handleOpen } = useShippigNotificationModal(transactionId, value);

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
