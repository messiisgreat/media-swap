import { findNotifications } from "@/app/notification/actions";
import { NotificationListContainer } from "@/app/notification/notificationListContainert";
import { PaginationBar } from "@/ui";

type Props = {
  filter: "ALL" | "UNREAD_ONLY";
  size: number;
  page: number;
};

/**
 * データ取得コンテナ
 * @param props page, size, filter
 */
export const NotificationContainer = async (props: Props) => {
  const { filter, page, size } = props;
  const notifications = await findNotifications();
  const total = Math.ceil(notifications.length / size);

  return (
    <>
      <NotificationListContainer
        notifications={notifications}
        filter={filter}
      />
      {total > 1 && <PaginationBar currentPage={page} totalPages={size} />}
    </>
  );
};
