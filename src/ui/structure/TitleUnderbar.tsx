import { H } from "@/ui/structure/H";

type Props = {
  title: string;
};

/**
 * 下線付きの見出し
 * @param {string} props.title - タイトルアンダーバーのタイトル
 */
export const TitleUnderbar = ({ title }: Props) => (
  <H className="relative w-full text-xl font-bold after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-gray-300">
    {title}
  </H>
);
