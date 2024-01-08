import { TabLinkListItem } from "@/app/(contents)/(auth)/mypage/_components/TabLinkListItem";

import { TabMenu } from "@/ui/tabmenu/TabMenu";

type PageInfo = {
  title: string;
  url: string;
};

type TabLinkListProps = {
  /* タブのリスト*/
  pages: PageInfo[];
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
  pages,
  content,
  contentEnum,
  link,
}: TabLinkListProps) => (
  <div className="w-full">
    <div className="m-auto px-4 sm:px-8">
      <TabMenu pages={pages} />
      <ul className="overflow-hidden rounded border border-gray-200 shadow-md">
        {Object.values(content).map((value) => (
          <TabLinkListItem
            key={value}
            contentEnum={contentEnum}
            link={link}
            value={value}
          />
        ))}
      </ul>
    </div>
  </div>
);
