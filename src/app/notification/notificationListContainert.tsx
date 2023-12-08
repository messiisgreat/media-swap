// eslint-disable-next-line import/order

import { Notification } from "@prisma/client";

import { Checkbox } from "@/app/notification/Checkbox";
import { NotificationList } from "@/app/notification/notificationList";

/**
 * データ取得コンテナ
 */
export const NotificationListContainer = async (props: {
  notifications: Notification[];
  filter: "ALL" | "UNREAD_ONLY";
}) => {
  const { notifications, filter } = props;
  const isUnReadOnly = filter === "UNREAD_ONLY";
  return (
    <>
      {notifications.length ? (
        <>
          <Checkbox filter={filter} isUnReadOnly={isUnReadOnly} />
          <ul
            role="list"
            className="w-full max-w-sm divide-y divide-gray-100 bg-white"
          >
            {notifications.map((n) => (
              <NotificationList
                key={n.id}
                notificationId={n.id}
                content={n.content}
                date={n.date}
                isChecked={isUnReadOnly}
              />
            ))}
          </ul>
        </>
      ) : (
        <NoNotifications />
      )}
    </>
  );
};

const NoNotifications = () => (
  <div className="text-center text-gray-400">通知がありません</div>
);
