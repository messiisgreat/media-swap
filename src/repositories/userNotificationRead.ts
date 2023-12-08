import prisma from "@/lib/prisma";
import "server-only";

/**
 * ユーザお知らせ既読情報作成
 * @param notificationId - 通知ID
 * @param userId - ユーザID
 */
export const createUserNotificationRead = async (
  notificationId: string,
  userId: string,
) => {
  return prisma.userNotificationRead.create({
    data: {
      notification: { connect: { id: notificationId } },
      user: { connect: { id: userId } },
    },
  });
};

/**
 * ユーザお知らせ既読情報取得
 * @param userId - ユーザID
 */
export const findNotificationReadsByUserId = async (userId: string) => {
  return prisma.userNotificationRead.findMany({
    where: { userId },
  });
};

/**
 * お知らせIDによるユーザお知らせ既読情報取得
 * @param notificationId - お知らせID
 * @param userId - ユーザID
 */
export const findNotificationReadById = async (
  notificationId: string,
  userId: string,
) => {
  return prisma.userNotificationRead.findFirst({
    where: { notificationId, userId },
  });
};
