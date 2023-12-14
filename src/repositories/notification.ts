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
export const createNotification = async (
  notification: Omit<Notification, "id">,
) => {
  const { notificationTypeId, ...rest } = notification;
  return await prisma.notification.create({
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
export const findNotificationsByUserId = async (
  userId: string,
  page: number,
  size: number,
) =>
  await prisma.notification.findMany({
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
export const countNotificationsByUserId = async (userId: string) =>
  await prisma.notification.count({
    where: { userNotificationReads: { some: { userId } } },
  });

/**
 * 未読のお知らせを取得する
 * @param userId ユーザID
 * @param page ページ
 * @param size 1ページあたりのサイズ
 */
export const findNotificationsByUserIdAndUnread = async (
  userId: string,
  page: number,
  size: number,
) =>
  await prisma.notification.findMany({
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
 * 未読のお知らせ数を取得する
 * @param userId ユーザID
 */
export const countNotificationsByUserIdAndUnread = async (userId: string) =>
  await prisma.notification.count({
    where: { userNotificationReads: { some: { userId } } },
  });
