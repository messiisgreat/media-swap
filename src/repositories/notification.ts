import { type Notification } from "@prisma/client";

import prisma from "@/lib/prisma";

import "server-only";

/** 通知タイプと既読情報を含んだNotificationsの配列 */
export type NotificationsQueryResult = Awaited<
  ReturnType<typeof findNotificationsByUserId>
>;

/**
 * お知らせを作成する
 * @param notification - 作成する通知情報
 */
export const createNotification = (notification: Omit<Notification, "id">) => {
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
 * @param userId ユーザID
 * @param page ページ
 * @param size 1ページあたりのサイズ
 */
export const findNotificationsByUserId = (
  userId: string,
  page: number,
  size: number,
) =>
  prisma.notification.findMany({
    skip: (page - 1) * size,
    take: size,
    where: { userNotificationReads: { some: { userId } } },
    include: {
      notificationType: true,
      userNotificationReads: { where: { userId }, take: 1 },
    },
    orderBy: {
      date: "asc",
    },
  });

/**
 * お知らせ数を取得する
 * @param userId ユーザID
 */
export const countNotificationsByUserId = (userId: string) =>
  prisma.notification.count({
    where: { userNotificationReads: { some: { userId } } },
  });

/**
 * 未読のお知らせを取得する
 * @param userId ユーザID
 * @param page ページ
 * @param size 1ページあたりのサイズ
 */
export const findNotificationsByUserIdAndUnread = (
  userId: string,
  page: number,
  size: number,
) =>
  prisma.notification.findMany({
    skip: (page - 1) * size,
    take: size,
    where: { userNotificationReads: { some: { userId } } },
    include: {
      notificationType: true,
      userNotificationReads: { where: { userId }, take: 1 },
    },
    orderBy: { date: "asc" },
  });

/**
 * 未読のお知らせ数を取得する
 * @param userId ユーザID
 * @todo 全く同じ内容の関数が重複しているので要調査
 */
export const countNotificationsByUserIdAndUnread = (userId: string) =>
  prisma.notification.count({
    where: { userNotificationReads: { some: { userId } } },
  });
