import { Notification } from "@prisma/client";

import prisma from "@/lib/prisma";

import "server-only";

/**
 * お知らせを作成する
 * @param notification - 作成する通知情報
 */
export const createNotification = async (
  notification: Omit<Notification, "id">,
) => {
  const { notificationTypeId, ...rest } = notification;
  return prisma.notification.create({
    data: {
      ...rest,
      notificationType: { connect: { id: notificationTypeId } },
    },
    include: {
      notificationType: true,
    },
  });
};

/**
 * お知らせ一覧取得
 * @param userId - ユーザID
 */
export const findNotificationsByUserId = async (userId: string) => {
  return prisma.notification.findMany({
    where: { userId },
    include: {
      notificationType: true,
    },
    orderBy: {
      date: "asc",
    },
  });
};
