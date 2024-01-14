"use client";

import { type Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export type PageInfo = {
  title: string;
  href: Route;
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
  return (
    <div role="tablist" className="tabs-bordered tabs-lg grid">
      {pages.map((page) => {
        const isActive = pathname === page.href;
        const tabActiveClass = isActive ? "tab-active" : "";
        return (
          <Link
            role="tab"
            className={twMerge(
              "tab max-sm:text-xs whitespace-nowrap",
              tabActiveClass,
            )}
            href={page.href}
            key={page.title}
          >
            {page.title}
          </Link>
        );
      })}
    </div>
  );
};
