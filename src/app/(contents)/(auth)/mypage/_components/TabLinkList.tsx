import { TabLinkListItem } from "@/app/(contents)/(auth)/mypage/_components/TabLinkListItem";
import { PAGE_TAB_CONTENT } from "@/app/(contents)/(auth)/mypage/_components/const";

import { TabMenu } from "@/ui/tabmenu/TabMenu";

type TabLinkListProps = {
  /* コンテンツ*/
  content: Record<string, string>;
  /* コンテンツの表示名*/
  contentEnum: Record<string, string>;
  /* リンク先*/
  link: Record<string, string>;
};

/**
 * タブリンクリスト
 * @param pages タブリンクリスト
 * @returns div > ul
 */
export const TabLinkList = ({
  content,
  contentEnum,
  link,
}: TabLinkListProps) => (
  <div className="w-full">
    <div className="m-auto px-4 sm:px-8">
      <TabMenu pages={PAGE_TAB_CONTENT} />
      <ul className="overflow-hidden rounded border border-gray-200 shadow-md">
        {Object.values(content).map((value) => (
          <li key={contentEnum[value]}>
            <TabLinkListItem {...{ contentEnum, link, value }} />
          </li>
        ))}
      </ul>
    </div>
  </div>
);
