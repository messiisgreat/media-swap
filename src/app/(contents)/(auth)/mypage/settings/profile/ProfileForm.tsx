"use client";

import { useFormState } from "react-dom";

import { ImageInput } from "@/app/(contents)/(auth)/mypage/settings/profile/ProfileImageInput";
import { profileFormAction } from "@/app/(contents)/(auth)/mypage/settings/profile/actions";
import { initialProfileFormValues } from "@/app/(contents)/(auth)/mypage/settings/profile/type";
import { Input } from "@/ui/form";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useFormMessageToaster } from "@/ui/form/hooks";
import { LimitTextarea } from "@/ui/form/inputs/LimitElements";
import { useVerify } from "@/ui/form/securityVerifier/hooks";
import { type User } from "@prisma/client";
import { createCodeAndSendEmail } from "@/features/emailVerification/actions";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { SETTING_CONTENT } from "@/constants/myPage";

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
    const result = await createCodeAndSendEmail();
    if (result.isSuccess) {
      redirect(`${SETTING_CONTENT.PROFILE}/email-success`);
    } else {
      toast.error(result.error);
    }
  };

  return (
    <form action={action} className="grid gap-3">
      <ImageInput
        initialSrc={user.image ?? ""}
        name="image"
        labelText="プロフィール画像"
      />
      <Input
        name="name"
        labelText="ニックネーム"
        autoComplete="username"
        placeholder="例: スワッピー"
        required
        defaultValue={state.values.name}
      />
      <Input
        name="email"
        labelText="メールアドレス"
        autoComplete="email address"
        placeholder="例: swappy@example.com"
        required
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
