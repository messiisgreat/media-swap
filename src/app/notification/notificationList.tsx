import Image from "next/image";

import { isNotificationRead } from "@/app/notification/actions";
import { SITE_NAME } from "@/constants/site";
import logo from "@/images/logo.png";
import { parseRelativeTime } from "@/utils";

type Props = {
  notificationId: string;
  isChecked: boolean;
  content: string;
  date: Date;
};

/**
 * データ取得コンテナ
 * @param props - notificationListContainerからのprops
 */
export const NotificationList = async (props: Props) => {
  const { notificationId, isChecked, content, date } = props;
  const isRead = await isNotificationRead(notificationId);
  const isDisplay = (isChecked && !isRead) || !isChecked;
  return (
    <>
      {isDisplay && (
        <li className={`flex gap-x-6 p-3 ${isRead && "bg-gray-100"}`}>
          <Image
            className="flex justify-center bg-gray-50"
            src={logo}
            height={28}
            width={28}
            alt={SITE_NAME}
          />
          <div className="flex-1">
            <div className="text-sm font-medium">{content}</div>
            <div className="text-xs text-gray-500">
              {parseRelativeTime(date)}
            </div>
          </div>
        </li>
      )}
    </>
  );
};
