"use client";

import { sendInquiry } from "@/app/(support)/inquiry/actions";
import {
  categoryOptions,
  initialInquiryFormValues,
} from "@/app/(support)/inquiry/types";
import { Input, Select, Textarea, handleCtrlEnterSubmit } from "@/ui/form";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useForm } from "@/ui/form/hooks";

/**
 * お問い合わせフォーム
 * @returns form
 */
export const MailForm = () => {
  const { Form, register } = useForm(sendInquiry, initialInquiryFormValues, {
    hasReset: true,
    hasAuth: true,
    hasToaster: true,
  });

  return (
    <Form className="grid gap-3">
      <Input
        labelText="お名前"
        {...register("name")}
        type="text"
        className="w-full"
        placeholder="山田太郎"
        required
      />
      <Input
        labelText="メールアドレス"
        {...register("email")}
        type="email"
        className="w-full"
        placeholder="you@example.com"
        required
      />
      <Select
        labelText="お問い合わせ種別"
        {...register("category")}
        options={categoryOptions}
        required
      />
      <Textarea
        labelText="お問い合わせ内容"
        placeholder="お問い合わせ内容を入力してください。"
        {...register("body")}
        required
        onKeyDown={handleCtrlEnterSubmit}
      />
      <SubmitButton>送信</SubmitButton>
    </Form>
  );
};
