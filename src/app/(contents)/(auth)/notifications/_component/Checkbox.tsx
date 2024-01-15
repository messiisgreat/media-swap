"use client";

import { type Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoCheckbox } from "react-icons/io5";

type Props = {
  filter: "all" | "unread";
};

/**
 * 検索パラメータの値によって、チェックボックスの表示を切り替えるリンクコンポーネント
 * @returns Link > div
 */
export const Checkbox = ({ filter }: Props) => {
  const pathname = usePathname();
  const isUnReadOnly = filter === "unread";
  // TODO: as Routeを削除する
  // eslint-disable-next-line no-restricted-syntax
  const href = `${pathname}?filter=${isUnReadOnly ? "" : "unread"}` as Route;

  return (
    <Link href={href} className="flex self-start">
      <div className="flex items-center justify-start gap-x-1 rounded-sm">
        <IoCheckbox color={`${isUnReadOnly ? "#3ea8ff" : "#ccc"}`} />
        <p>未読のみ表示する</p>
      </div>
    </Link>
  );
};
