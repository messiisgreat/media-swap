import {
  type NoticeFormState,
  type NoticeFormValues,
} from "@/app/(contents)/(auth)/mypage/settings/notifications/type";
import { NOTIFICATION_KEYS } from "@/constants/emailNotification";
import { decimalToBinary } from "@/utils/converter";

/**
 * 通知コードから通知設定フォームの初期値を生成する
 * @param code 通知コード
 */
export const convertCodeToInitial = (code: number): NoticeFormState => {
  const length = NOTIFICATION_KEYS.length;
  const noticeBooleans = decimalToBinary(code, length);

  const values = Object.fromEntries(
    NOTIFICATION_KEYS.map((key, index) => [
      key,
      noticeBooleans[index]?.toString(),
    ]),
  ) as NoticeFormValues;

  return {
    values: {
      ...values,
      verificationCode: "",
    },
  };
};
