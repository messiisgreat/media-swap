import { browsing, getViewCount } from "@/app/(contents)/item/[id]/_components/actions";
import { FaEye } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

type Props = {
  itemId: string;
  className?: string;
};

/**
 * 閲覧履歴の記録を行い、閲覧数マークを表示
 */
export const BrowsingHistory = async ({ itemId, className }: Props) => {
  await browsing(itemId);
  const count = await getViewCount(itemId);
  return (
    <div className={twMerge("flex flex-col items-center", className)}>
      <div className="grid w-12 h-12 place-items-center"><FaEye size="2rem" /></div>
      <span>{count}</span>
    </div>
  );
};
