"use client";

import { PAGE_TAB_CONTENT } from "@/app/(contents)/(auth)/mypage/const";
import {
  PAGE_CONTENT_ENUM_JA,
  type PageContentValue,
} from "@/constants/myPage";
import { PageTitle } from "@/ui/structure";
import { TabMenu } from "@/ui/tabmenu/TabMenu";
import { isEnclosedInParentheses } from "@/utils/typeGuard";
import { type Route } from "next";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";

/**
 * マイページのレイアウト
 */
export const LayoutProvider = () => {
  const segments = useSelectedLayoutSegments().filter(
    (s) => !isEnclosedInParentheses(s),
  );
  const isCategoryPage = segments.length === 1;
  const isItemPage = segments.length === 2;

  if (isCategoryPage) {
    return <TabMenu pages={PAGE_TAB_CONTENT} className="w-full" />;
  }

  if (isItemPage) {
    // segmentsがstring[]のため型を指定
    // eslint-disable-next-line no-restricted-syntax
    const href = `/mypage/${segments[0]}` as Route;
    // eslint-disable-next-line no-restricted-syntax
    const value = segments[segments.length - 1] as PageContentValue;
    const title = PAGE_CONTENT_ENUM_JA[value];
    return (
      <div className="grid w-full grid-cols-[1fr,auto,1fr] items-center justify-center">
        <Link href={href} title="前のページに戻る" className="cursor-pointer">
          <FaAngleLeft size={24} aria-label="前のページに戻る" />
        </Link>
        <PageTitle title={title} />
      </div>
    );
  }
  return null;
};
