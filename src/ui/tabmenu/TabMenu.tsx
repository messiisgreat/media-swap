"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

type PageInfo = {
  title: string;
  url: string;
};

type Props = {
  pages: PageInfo[];
};

/**
 * ページタイトルとURLを含むオブジェクトの配列から、
 * 関連するページをタブで表示する
 * 現在のURLと一致するページはアクティブなスタイルを適用する
 * @returns div > Link
 */
export const TabMenu = ({ pages }: Props) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div role="tablist" className="tabs-bordered tabs-lg grid">
      {pages.map((page, index) => {
        const isActive = pathname === page.url;
        const tabActiveClass = isActive ? "tab-active" : "";
        return (
          <Link
            role="tab"
            className={twMerge(
              "tab max-sm:text-xs whitespace-nowrap",
              tabActiveClass,
            )}
            href={page.url}
            key={index}
          >
            {page.title}
          </Link>
        );
      })}
    </div>
  );
};
