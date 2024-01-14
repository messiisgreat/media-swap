import { type Route } from "next";
import Link from "next/link";
import { FiChevronsRight } from "react-icons/fi";

type TabLinkListItemProps = {
  /** 表示名 */
  title: string;
  /** リンク先URL */
  href: Route;
};

/**
 * タブリンクのリストアイテムコンポーネント
 * @returns li > Link
 */
export const TabLinkListItem = ({ title, href }: TabLinkListItemProps) => (
  <Link href={href}>
    <div
      className="flex justify-between border-b border-gray-200 bg-white px-4 py-6
       transition-all duration-300 ease-in-out
       last:border-none hover:bg-sky-100 hover:text-sky-900"
    >
      <p>{title}</p>
      <FiChevronsRight size={24} />
    </div>
  </Link>
);
