import { NotificationContainer } from "@/app/(contents)/(auth)/notifications/_component/NotificationContainer";

type Props = {
  searchParams: {
    filter: "all" | "unread";
    page: number;
    size: number;
  };
};

/**
 * お知らせページ
 */
export default function Page({
  searchParams: { filter = "all", page = 1, size = 27 },
}: Props) {
  return <NotificationContainer filter={filter} page={page} size={size} />;
}
