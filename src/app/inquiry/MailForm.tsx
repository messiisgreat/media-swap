"use client";

import { sendInquiry } from "@/app/inquiry/actions";
import { categoryOptions, initialInquiryFormValues } from "@/app/inquiry/types";
import FormSubmitButton from "@/components/FormSubmitButton";
import {
  Input,
  Select,
  Textarea,
  useFormMessageToaster,
} from "@/components/form";
import { useCallback } from "react";
import { useFormState } from "react-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

/**
 * お問い合わせフォーム
 * @returns form
 */
export const MailForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [state, dispatch] = useFormState(sendInquiry, initialInquiryFormValues);
  useFormMessageToaster(state);

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) return;
    return executeRecaptcha();
  }, [executeRecaptcha]);

  const action = async (f: FormData) => {
    const verificationCode = await handleReCaptchaVerify();
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
      <FormSubmitButton>送信</FormSubmitButton>
    </form>
  );
};
