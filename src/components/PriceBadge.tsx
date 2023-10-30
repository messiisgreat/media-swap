import PriceBadgeSVG from "@/components/PriceBadgeSVG";
import React, { ReactNode } from "react";

type PriceBadgeProps = {
  children: ReactNode;
  className?: string;
};

/**
 * 価格バッジコンポーネント。
 * @component
 * @name PriceBadge
 * @param {Object} props  コンポーネントのプロパティ。
 * @param {ReactNode} props.children  表示する価格情報。
 * @param {string} [props.className]  追加のCSSクラス名。
 * @returns {JSX.Element} 価格バッジコンポーネント。
 *
 * @example
 * <PriceBadge className="my-custom-class">1000</PriceBadge>
 */

const PriceBadge: React.FC<PriceBadgeProps> = ({ children, className }) => {
  return (
    <div className={`${className}`}>
      <PriceBadgeSVG />
      <div className="absolute left-1 top-1 z-10 text-white">{children}P</div>
    </div>
  );
};

export default PriceBadge;
