import { Checkbox } from "@/app/(contents)/(auth)/notifications/_component/Checkbox";
import { NotificationCard } from "@/app/(contents)/(auth)/notifications/_component/NotificationCard";
import { type findNotificationsByUserId } from "@/repositories/notification";

const NoNotifications = () => (
  <div className="text-center text-gray-400">通知がありません</div>
);

type Props = {
  notifications: Awaited<ReturnType<typeof findNotificationsByUserId>>;
  filter: "all" | "unread";
};

/**
 * 通知一覧を表示する
 */
export const NotificationListRenderer = ({ notifications, filter }: Props) => {
  if (notifications.length === 0) {
    return <NoNotifications />;
  }

  return (
    <>
      <Checkbox filter={filter} />
      <ul className="w-full max-w-sm divide-y divide-gray-100 bg-white">
        {notifications.map((notification) => (
          <li key={notification.id}>
            <NotificationCard {...{ notification }} />
          </li>
        ))}
      </ul>
    </>
  );
};
