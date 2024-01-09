import Link from "next/link";
import { FiChevronsRight } from "react-icons/fi";

type TabLinkListItemProps = {
  /* コンテンツの表示名*/
  contentEnum: Record<string, string>;
  /* リンク先*/
  link: Record<string, string>;
  /* コンテンツの値*/
  value: string;
};

/**
 * タブリンクのリストアイテムコンポーネント
 * @param {TabLinkListItemProps} props - コンポーネントのプロップス
 * @returns li > Link
 */
export const TabLinkListItem = ({
  contentEnum,
  link,
  value,
}: TabLinkListItemProps) => (
  <Link href={link[value] ?? ""}>
    <div className="flex justify-between border-b border-gray-200 bg-white px-4 py-6 transition-all duration-300 ease-in-out last:border-none hover:bg-sky-100 hover:text-sky-900">
      <p>{contentEnum[value]}</p>
      <FiChevronsRight size={24} />
    </div>
  </Link>
);
