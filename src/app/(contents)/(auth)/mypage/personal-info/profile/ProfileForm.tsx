"use client";

import { useFormState } from "react-dom";

import { ProfileImageInput } from "@/app/(contents)/(auth)/mypage/personal-info/profile/ProfileImageInput";
import { profileFormAction } from "@/app/(contents)/(auth)/mypage/personal-info/profile/actions";
import { initialProfileFormValues } from "@/app/(contents)/(auth)/mypage/personal-info/profile/type";
import { Input } from "@/ui/form";
import { LimitTextarea } from "@/ui/form/LimitElements";
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
      ? {
          email: user.email,
          name: user.name || "",
          image: null,
          introduction: user.introduction || "",
          verificationCode: "",
        }
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
      <ProfileImageInput src={user.image ?? ""} />
      <Input
        name="name"
        labelText="お名前"
        autoComplete="username"
        placeholder="swappy taro"
        defaultValue={state.values.name}
      />
      <Input
        name="email"
        labelText="メールアドレス"
        autoComplete="email address"
        placeholder="例: swappy@email.com"
        defaultValue={state.values.email}
      />
      <LimitTextarea
        name="introduction"
        labelText="自己紹介"
        maxLength={2000}
        placeholder="例: よろしくお願いします！商品の状態・発送方法など気軽にご質問ください！"
        defaultValue={state.values.introduction}
      />
      <SubmitButton>更新</SubmitButton>
    </form>
  );
};
