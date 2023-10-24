import { ComponentProps, memo } from "react";

type Props = ComponentProps<"button"> & {
  outline?: boolean;
  secondary?: boolean;
};

/**
 * ボタンコンポーネント
 *
 * @param {boolean} [props.outline=false] - ボタンをアウトラインスタイルにするかどうか(省略可能)
 * @param {boolean} [props.secondary=false] - セカンダリスタイルのボタンかどうか(省略可能)
 * @param {ReactNode} props.children - ボタン内に表示されるコンテンツ。
 * @param {string} [props.className] - 追加のCSSクラス名(省略可能)
 * @param {*} [props.type="button"] - ボタンのタイプ属性(省略可能)
 * @returns
 */
export const Button = memo(function Button({
  outline = false,
  secondary = false,
  children,
  className,
  type = "button",
  ...props
}: Props) {
  const variant = `${outline ? "btn-outline" : ""} ${
    secondary ? "btn-secondary" : "btn-primary"
  }`;
  return (
    <button className={`btn ${variant} ${className}`} type={type} {...props}>
      {children}
    </button>
  );
});
