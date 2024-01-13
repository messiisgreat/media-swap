import { getObjectKeys } from "@/utils/converter";

export const NOTIFICATION_TYPES = {
  purchaseNotification: "purchaseNotification",
  transactionMessageNotification: "transactionMessageNotification",
  itemCommentsNotification: "itemCommentsNotification",
} as const satisfies Record<string, string>;

export type NotificationTypeKey = keyof typeof NOTIFICATION_TYPES;

export const NOTIFICATION_KEYS = getObjectKeys(NOTIFICATION_TYPES);

export const NOTIFICATION_LABELS = {
  purchaseNotification: "購入通知",
  transactionMessageNotification: "取引メッセージ通知",
  itemCommentsNotification: "商品コメント通知",
} as const satisfies Record<NotificationTypeKey, string>;
