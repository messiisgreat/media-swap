"use client";

import { sendInquiry } from "@/app/inquiry/actions";
import { categoryOptions, initialInquiryFormValues } from "@/app/inquiry/types";
import {
  Input,
  Select,
  SubmitButton,
  Textarea,
  useFormMessageToaster,
} from "@/components/form";
import { useVerify } from "@/components/securityVerifier/hooks";
import { useFormState } from "react-dom";

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
    f.append("verificationCode", verificationCode || "");
    dispatch(f);
  };

  return (
    <form action={action} className="grid gap-3">
      <Input
        labelText="お名前"
        id="name"
        name="name"
        type="text"
        className="w-full"
        placeholder="山田太郎"
        required
      />
      <Input
        labelText="メールアドレス"
        id="email"
        name="email"
        type="email"
        className="w-full"
        placeholder="you@example.com"
        required
      />
      <Select
        labelText="お問い合わせ種別"
        id="category"
        name="category"
        options={categoryOptions}
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
      <SubmitButton>送信</SubmitButton>
    </form>
  );
};
