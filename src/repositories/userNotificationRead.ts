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
) => await prisma.userNotificationRead.create({
    data: {
      notification: { connect: { id: notificationId } },
      user: { connect: { id: userId } },
    },
  });
