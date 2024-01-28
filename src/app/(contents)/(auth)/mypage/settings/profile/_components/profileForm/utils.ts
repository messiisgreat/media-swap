import { initialProfileFormValues } from "@/app/(contents)/(auth)/mypage/settings/profile/_components/profileForm/type";
import { type User } from "@prisma/client";

/**
 * フォームに設定するプロフィールの初期値を取得する
 * @param user ユーザー情報
 */
export const getInitialValues = (user: User | null) => ({
  values: user
    ? {
        email: user.email,
        name: user.name ?? "",
        image: null,
        introduction: user.introduction ?? "",
        verificationCode: "",
      }
    : initialProfileFormValues.values,
});
