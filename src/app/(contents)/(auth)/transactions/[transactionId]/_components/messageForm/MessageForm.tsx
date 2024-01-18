"use client";

import { messageFormAction } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/messageForm/actions";
import { initialTransactionMessageState } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/messageForm/types";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useForm } from "@/ui/form/hooks";
import { LimitInput } from "@/ui/form/inputs/LimitElements";
import { BiSend } from "react-icons/bi";

/**
 * 取引メッセージを送信するフォーム
 * @param transactionId 取引ID
 */
export const MessageForm = ({ transactionId }: { transactionId: string }) => {
  const formOptions = {
    authenticationRequired: true,
    shouldReset: true,
    showToast: true,
  };
  const { Form, register } = useForm(
    messageFormAction,
    initialTransactionMessageState,
    formOptions,
  );
  return (
    <Form className="input flex w-full items-center p-0">
      <LimitInput
        type="text"
        placeholder="メッセージを入力..."
        className="grow rounded-r-none"
        maxLength={300}
        hideLimit
        {...register("message")}
      />
      <input
        type="hidden"
        {...register("transactionId")}
        defaultValue={transactionId}
      />
      <SubmitButton className="btn-square btn-primary shrink-0 rounded-l-none">
        <BiSend size="2rem" />
      </SubmitButton>
    </Form>
  );
};
