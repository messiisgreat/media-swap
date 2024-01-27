import { TabLinkListItem } from "@/app/(contents)/(auth)/mypage/_components/TabLinkListItem";
import {
  PAGE_CONTENT_ENUM_JA,
  PAGE_LINK,
  type PageContentKey,
  type PageContentValue,
} from "@/constants/myPage";

type TabLinkListProps<T> = {
  /* コンテンツのKey Value Object*/
  content: T;
};

/**
 * タブリンクリスト
 * @param pages タブリンクリスト
 * @returns div > ul
 */
export const TabLinkList = <
  T extends Partial<Record<PageContentKey, PageContentValue>>,
>({
  content,
}: TabLinkListProps<T>) => (
  <ul className="overflow-hidden rounded border border-gray-200 shadow-md">
    {Object.values(content).map((value) => (
      <li key={value}>
        <TabLinkListItem
          title={PAGE_CONTENT_ENUM_JA[value]}
          href={PAGE_LINK[value]}
        />
      </li>
    ))}
  </ul>
);
