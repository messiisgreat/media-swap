import { TabLinkListItem } from "@/app/(contents)/(auth)/mypage/_components/TabLinkListItem";
import { PAGE_TAB_CONTENT } from "@/app/(contents)/(auth)/mypage/_components/const";

import { TabMenu } from "@/ui/tabmenu/TabMenu";
import { getObjectValues } from "@/utils/converter";
import { type ValueOf } from "@/utils/types";
import { type Route } from "next";

type TabLinkListProps<T extends Record<string, string>> = {
  /* コンテンツ*/
  content: T;
  /* コンテンツの表示名*/
  contentEnum: Record<ValueOf<T>, string>;
  /* リンク先*/
  link: Record<ValueOf<T>, Route>;
};

/**
 * タブリンクリスト
 * @param pages タブリンクリスト
 * @returns div > ul
 */
export const TabLinkList = <T extends Record<string, string>>({
  content,
  contentEnum,
  link,
}: TabLinkListProps<T>) => (
  <div className="w-full">
    <div className="m-auto px-4 sm:px-8">
      <TabMenu pages={PAGE_TAB_CONTENT} />
      <ul className="overflow-hidden rounded border border-gray-200 shadow-md">
        {getObjectValues(content).map((value) => (
          <li key={value}>
            <TabLinkListItem title={contentEnum[value]} href={link[value]} />
          </li>
        ))}
      </ul>
    </div>
  </div>
);
