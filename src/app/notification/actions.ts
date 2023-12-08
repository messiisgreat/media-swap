import { findNotificationsByUserId } from "@/repositories/notification";
import { findNotificationReadById } from "@/repositories/userNotificationRead";
import { getSessionUser } from "@/utils";

/**
 * ユーザお知らせ情報取得
 */
export const findNotifications = async () => {
  const user = await getSessionUser();
  const userId = user?.id;
  if (!userId) throw new Error("user not found");
  return await findNotificationsByUserId(userId);
};

/**
 * 通知が既読かどうかbooleanで返却
 * @param notificationId - 通知ID
 */
export const isNotificationRead = async (notificationId: string) => {
  const user = await getSessionUser();
  const userId = user?.id;
  if (!userId) throw new Error("user not found");
  const notificationRead = await findNotificationReadById(
    notificationId,
    userId,
  );
  return !!notificationRead;
};
