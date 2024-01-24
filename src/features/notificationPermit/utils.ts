import {
  NOTIFICATION_KEYS,
  NOTIFICATION_TYPES,
  type NotificationTypeKey,
} from "@/constants/emailNotification";
import { decimalToBinary } from "@/utils/converter";

/**
 * 通知コードからその種類の通知を求めているかどうか判定する
 * @param notificationCode 通知コード
 * @param notificationType 通知種類
 */
export const isNotificationDesired = (
  notificationCode: number,
  notificationType: NotificationTypeKey,
) => {
  const numberOfKeys = Object.keys(NOTIFICATION_TYPES).length;
  const notificationBinary = decimalToBinary(notificationCode, numberOfKeys);
  const purchaseIndex = NOTIFICATION_KEYS.indexOf(notificationType);
  return notificationBinary[purchaseIndex];
};
