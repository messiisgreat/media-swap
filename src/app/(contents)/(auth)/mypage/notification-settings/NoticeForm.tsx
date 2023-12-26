"use client";

import { profileUpdateAction } from "@/app/(contents)/(auth)/mypage/notification-settings/action";
import { convertCodeToinitial } from "@/app/(contents)/(auth)/mypage/notification-settings/utils";
import {
  NOTIFICATION_KEYS,
  NOTIFICATION_LABELS,
  NOTIFICATION_TYPES,
} from "@/constants/emailNotification";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { ToggleSwitch } from "@/ui/form/ToggleSwitch";
import { useFormMessageToaster } from "@/ui/form/hooks";
import { useVerify } from "@/ui/form/securityVerifier/hooks";
import { useFormState } from "react-dom";

/**
 * 通知を設定するフォーム
 * 定数に設定している通知設定の数だけToggleSwitchを表示する
 * @param noticePermissionCode 通知設定のコード
 */
export const NoticeForm = ({
  noticePermissionCode,
}: {
  noticePermissionCode: number;
}) => {
  const initialValues = convertCodeToinitial(noticePermissionCode);
  const [state, dispatch] = useFormState(profileUpdateAction, initialValues);
  const getVerificationCode = useVerify();
  useFormMessageToaster(state);

  const action = async (f: FormData) => {
    const verificationCode = await getVerificationCode();
    f.append("verificationCode", verificationCode);
    dispatch(f);
  };
  return (
    <form action={action} className="grid gap-y-4">
      {NOTIFICATION_KEYS.map((option) => (
        <ToggleSwitch
          key={option}
          labelText={NOTIFICATION_LABELS[option]}
          name={NOTIFICATION_TYPES[option]}
          defaultChecked={state.values[option]}
        />
      ))}
      <SubmitButton>変更を保存</SubmitButton>
    </form>
  );
};
