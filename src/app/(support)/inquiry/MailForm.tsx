"use client";

import { sendInquiry } from "@/app/(support)/inquiry/actions";
import {
  categoryOptions,
  initialInquiryFormValues,
} from "@/app/(support)/inquiry/types";
import { Input, Select, Textarea, handleCtrlEnterSubmit } from "@/ui/form";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useForm, type FormOptions } from "@/ui/form/hooks";

/**
 * お問い合わせフォーム
 * @returns form
 */
export const MailForm = () => {
  const formOptions: FormOptions = {
    authenticationRequired: true,
    shouldReset: true,
    showToast: true,
  };
  const { Form, register } = useForm(
    sendInquiry,
    initialInquiryFormValues,
    formOptions,
  );

  return (
    <Form className="grid gap-3">
      <Input
        labelText="お名前"
        type="text"
        className="w-full"
        placeholder="山田太郎"
        required
        {...register("name")}
      />
      <Input
        labelText="メールアドレス"
        type="email"
        className="w-full"
        placeholder="you@example.com"
        required
        {...register("email")}
      />
      <Select
        labelText="お問い合わせ種別"
        options={categoryOptions}
        required
        {...register("category")}
      />
      <Textarea
        labelText="お問い合わせ内容"
        placeholder="お問い合わせ内容を入力してください。"
        required
        onKeyDown={handleCtrlEnterSubmit}
        {...register("body")}
      />
      <SubmitButton>送信</SubmitButton>
    </Form>
  );
};
