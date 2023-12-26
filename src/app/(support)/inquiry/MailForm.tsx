"use client";

import { useFormState } from "react-dom";

import { sendInquiry } from "@/app/(support)/inquiry/actions";
import {
  categoryOptions,
  initialInquiryFormValues,
} from "@/app/(support)/inquiry/types";
import { Input, Select, Textarea } from "@/ui/form";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useFormMessageToaster } from "@/ui/form/hooks";
import { useVerify } from "@/ui/form/securityVerifier/hooks";

/**
 * お問い合わせフォーム
 * @returns form
 */
export const MailForm = () => {
  const [state, dispatch] = useFormState(sendInquiry, initialInquiryFormValues);
  const getVerificationCode = useVerify();
  useFormMessageToaster(state);

  const action = async (f: FormData) => {
    const verificationCode = await getVerificationCode();
    f.append("verificationCode", verificationCode);
    dispatch(f);
  };

  return (
    <form action={action} className="grid gap-3">
      <Input
        labelText="お名前"
        name="name"
        type="text"
        className="w-full"
        placeholder="山田太郎"
        required
      />
      <Input
        labelText="メールアドレス"
        name="email"
        type="email"
        className="w-full"
        placeholder="you@example.com"
        required
      />
      <Select
        labelText="お問い合わせ種別"
        name="category"
        options={categoryOptions}
        required
      />
      <Textarea
        labelText="お問い合わせ内容"
        placeholder="お問い合わせ内容を入力してください。"
        name="body"
        required
      />
      <SubmitButton>送信</SubmitButton>
    </form>
  );
};
