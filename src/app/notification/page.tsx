import { NotificationContainer } from "@/app/notification/notificationContainer";

type Props = {
  searchParams: {
    filter: "ALL" | "UNREAD_ONLY";
    page: number;
    size: number;
  };
};

/**
 * お知らせページ
 */
export default function Notification({
  searchParams: { filter = "ALL", page = 1, size = 27 },
}: Props) {
  return <NotificationContainer filter={filter} page={page} size={size} />;
}
