import { type NotificationTypeKey } from "@/constants/emailNotification";
import { type FormState } from "@/ui/form";

/** 通知設定フォームの値 */
export type NoticeFormValues = Record<NotificationTypeKey, "true" | "false">;

/** 通知設定フォームの状態とバリデーション、メッセージを表す型 */
export type NoticeFormState = FormState<NoticeFormValues>;
