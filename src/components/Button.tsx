import Link from "next/link";
import { ComponentProps, memo } from "react";

type CommonProps = {
  outline?: boolean;
  secondary?: boolean;
  isOwner?: boolean;
};

type ButtonProps = ComponentProps<"button"> & CommonProps;

type LinkProps = ComponentProps<typeof Link> & CommonProps;

/**
 * ボタンコンポーネント
 *
 * @param {boolean} [props.outline=false] - ボタンをアウトラインスタイルにするかどうか(省略可能)
 * @param {boolean} [props.secondary=false] - セカンダリスタイルのボタンかどうか(省略可能)
 * @param {ReactNode} props.children - ボタン内に表示されるコンテンツ。
 * @param {string} [props.className] - 追加のCSSクラス名(省略可能)
 * @param {*} [props.type="button"] - ボタンのタイプ属性(省略可能)
 * @param {boolean} props.isOwner - 出品者かどうか
 * @returns
 */
export const Button = memo(function Button({
  outline = false,
  secondary = false,
  children,
  className,
  type = "button",
  isOwner,
  ...props
}: ButtonProps) {
  const variant = `${outline ? "btn-outline" : ""} ${
    secondary ? "btn-secondary" : "btn-primary"
  }`;

  if(isOwner) {
    return null;
  }

  return (
    <button className={`btn ${variant} ${className}`} type={type} {...props}>
      {children}
    </button>
  );
});

export const ButtonAsLink = memo(function ButtonAsLink({
  outline = false,
  secondary = false,
  children,
  className,
  ...props
}: LinkProps) {
  const variant = `${outline ? "btn-outline" : ""} ${
    secondary ? "btn-secondary" : "btn-primary"
  }`;
  return (
    <Link className={`btn ${variant} ${className}`} {...props}>
      {children}
    </Link>
  );
});
