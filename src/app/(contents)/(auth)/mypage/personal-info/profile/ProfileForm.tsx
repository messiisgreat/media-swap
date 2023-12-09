"use client";

import { useFormState } from "react-dom";

import { profileFormAction } from "@/app/(contents)/(auth)/mypage/personal-info/profile/actions";
import { initialProfileFormValues } from "@/app/(contents)/(auth)/mypage/personal-info/profile/type";
import { Input } from "@/ui/form";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useFormMessageToaster } from "@/ui/form/hooks";
import { useVerify } from "@/ui/form/securityVerifier/hooks";
import { type User } from "@prisma/client";

type Props = {
  user: User;
};

/**
 * プロフィールフォーム
 * @param param0.user ユーザー
 * @returns form
 */
export const ProfileForm = ({ user }: Props) => {
  const currentValues = {
    values: user
      ? { ...user, verificationCode: "" }
      : initialProfileFormValues.values,
  };
  const [state, dispatch] = useFormState(profileFormAction, currentValues);
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
        name="email"
        labelText="メールアドレス"
        autoComplete="email address"
        placeholder="例: swappy@email.com"
        defaultValue={state.values.email}
      />
      <SubmitButton>更新</SubmitButton>
    </form>
  );
};
