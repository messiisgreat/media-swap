"use client";

import { ImageInput } from "@/app/(contents)/(auth)/mypage/settings/profile/_components/profileForm/ProfileImageInput";
import { profileFormAction } from "@/app/(contents)/(auth)/mypage/settings/profile/_components/profileForm/actions";
import { getInitialValues } from "@/app/(contents)/(auth)/mypage/settings/profile/_components/profileForm/utils";
import { Input } from "@/ui/form";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useForm } from "@/ui/form/hooks";
import { LimitTextarea } from "@/ui/form/inputs/LimitElements";
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
  const initialValues = getInitialValues(user);
  const { Form, values } = useForm(profileFormAction, initialValues, {
    authenticationRequired: true,
    showToast: true,
  });

  return (
    <Form className="grid gap-3">
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
        defaultValue={values.name}
      />
      <Input
        name="email"
        labelText="メールアドレス"
        autoComplete="email address"
        placeholder="例: swappy@example.com"
        required
        defaultValue={values.email}
      />
      <LimitTextarea
        name="introduction"
        labelText="自己紹介"
        maxLength={2000}
        placeholder="例: よろしくお願いします！商品の状態・発送方法など気軽にご質問ください！"
        defaultValue={values.introduction}
      />
      <SubmitButton>更新</SubmitButton>
    </Form>
  );
};
