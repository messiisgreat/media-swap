import React, {ReactNode} from 'react';

type PriceBadgeProps = {
  children: ReactNode;
  className?: string;
};

/**
 * 価格情報を表示するためのバッジコンポーネントです。
 * 追加のCSSクラス名を `className` プロパティで指定することができます。
 *
 * @param {PriceBadgeProps} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - 表示する価格情報
 * @param {string} [props.className] - 追加のCSSクラス名（オプショナル）
 * @returns {JSX.Element} レンダリングされる価格バッジコンポーネント
 *
 * @example
 * <PriceBadge className="my-custom-class">¥1000</PriceBadge>
 */
const PriceBadge: React.FC<PriceBadgeProps> = ({ children, className }) => (
  <div className={`${className}`}>
    <div className="absolute left-1 top-1 z-10 text-white">{children}</div>
  </div>
);

export default PriceBadge;
