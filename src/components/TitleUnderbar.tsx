import React from "react";
import { H } from "@/components/structure/H";

type TitleUnderbarProps = {
  title: string;
};

/**
 * タイトルとオプションの下線の色を持つタイトルアンダーバーコンポーネント
 *
 * @param {TitleUnderbarProps} props - タイトルアンダーバーコンポーネントのプロパティ
 * @param {string} props.title - タイトルアンダーバーのタイトル
 */
export const TitleUnderbar = ({ title }: TitleUnderbarProps) => {
  return (
    <H className="relative text-lg after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-gray-300">
      {title}
    </H>
  );
};
