import { NotificationList } from "@/app/(contents)/(auth)/notifications/_component/NotificationList";
import {
  countNotificationsByUserId,
  countNotificationsByUserIdAndUnread,
  findNotificationsByUserId,
  findNotificationsByUserIdAndUnread,
  type NotificationsQueryResult,
} from "@/repositories/notification";
import { PaginationBar } from "@/ui";
import { getSessionUser } from "@/utils";

type Props = {
  page: number;
  size: number;
  filter: "all" | "unread";
};

/**
 * フィルター条件に応じて通知を取得する
 * @param userId ユーザーID
 * @param props page, size, filter
 * @returns [通知の配列, 通知数]
 */
const findNotificationsAndCount = async (
  userId: string,
  props: Props,
): Promise<[NotificationsQueryResult, number]> => {
  const { page, size, filter } = props;
  if (filter === "unread") {
    const [notifications, count] = await Promise.all([
      findNotificationsByUserIdAndUnread(userId, page, size),
      countNotificationsByUserIdAndUnread(userId),
    ]);
    return [notifications, count];
  } else {
    const [notifications, count] = await Promise.all([
      findNotificationsByUserId(userId, page, size),
      countNotificationsByUserId(userId),
    ]);
    return [notifications, count];
  }
};

/**
 * データ取得コンテナ
 * @param props page, size, filter
 */
export const NotificationContainer = async (props: Props) => {
  const user = await getSessionUser();
  const userId = user!.id;
  const [notifications, count] = await findNotificationsAndCount(userId, props);
  const total = Math.ceil(count / props.size);

  return (
    <>
      <NotificationList notifications={notifications} filter={props.filter} />
      {total > 1 && (
        <PaginationBar currentPage={props.page} totalPages={total} />
      )}
    </>
  );
};
