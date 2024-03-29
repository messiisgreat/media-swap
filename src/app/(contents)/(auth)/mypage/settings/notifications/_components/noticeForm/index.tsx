"use client";

import { profileUpdateAction } from "@/app/(contents)/(auth)/mypage/settings/notifications/_components/noticeForm/action";
import { convertCodeToInitial } from "@/app/(contents)/(auth)/mypage/settings/notifications/_components/noticeForm/utils";
import {
  NOTIFICATION_KEYS,
  NOTIFICATION_LABELS,
  NOTIFICATION_TYPES,
} from "@/constants/emailNotification";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useForm, type FormOptions } from "@/ui/form/hooks";
import { ToggleSwitch } from "@/ui/form/inputs";

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
  const initialValues = convertCodeToInitial(noticePermissionCode);
  const formOptions: FormOptions = {
    authenticationRequired: true,
    showToast: true,
  };
  const { Form, values } = useForm(
    profileUpdateAction,
    initialValues,
    formOptions,
  );

  return (
    <Form className="grid gap-y-4">
      {NOTIFICATION_KEYS.map((option) => (
        <ToggleSwitch
          key={option}
          labelText={NOTIFICATION_LABELS[option]}
          name={NOTIFICATION_TYPES[option]}
          defaultChecked={Boolean(values[option])}
        />
      ))}
      <SubmitButton>変更を保存</SubmitButton>
    </Form>
  );
};
