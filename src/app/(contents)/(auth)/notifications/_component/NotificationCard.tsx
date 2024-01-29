import Image from "next/image";

import { SITE_NAME } from "@/constants/site";
import logo from "@/images/logo.png";
import { type NotificationsQueryResult } from "@/repositories/notification";
import { parseRelativeTime } from "@/utils";
import { twMerge } from "tailwind-merge";

/**
 * データ取得コンテナ
 *
 */
export const NotificationCard = ({
  notification,
}: {
  notification: NotificationsQueryResult[number];
}) => {
  const { content, date, userNotificationReads } = notification;
  const isRead = userNotificationReads.length > 0;
  return (
    <div className={twMerge("flex gap-x-6 p-3", isRead ? "bg-gray-100" : "")}>
      <Image
        className="flex justify-center bg-gray-50"
        src={logo}
        height={28}
        width={28}
        alt={SITE_NAME}
      />
      <div className="flex-1">
        <div className="text-sm font-medium">{content}</div>
        <div className="text-xs text-gray-500">{parseRelativeTime(date)}</div>
      </div>
    </div>
  );
};
