import { H } from "@/components/structure/H";

type Props = {
  title: string;
};

/**
 * ページのはじめに表示するタイトル
 * 必ず直後にSectionコンポーネントを配置すること
 * @param title タイトル文字列
 */
export const PageTitle = ({ title }: Props) => {
  return <H className="text-2xl font-extrabold">{title}</H>;
};
