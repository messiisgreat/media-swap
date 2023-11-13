import { ComponentProps } from "react";

const badgeVariants = {
  primary: "badge-primary",
  secondary: "badge-secondary",
  success: "badge-success",
  danger: "badge-danger",
  warning: "badge-warning",
  info: "badge-info",
};

type BadgeProps = ComponentProps<"div"> & {
  variant?: keyof typeof badgeVariants;
  outline?: boolean;
};

/**
 * バッジ
 *
 * @param {string} [props.className] - 追加のCSSクラス名(省略可能)
 * @param {*} [props.variant] - バッジのバリエーション(省略可能)
 * @param {boolean} [props.outline] - バッジをアウトラインスタイルにするかどうか(省略可能)
 * @returns 
 */
export const Badge = ({
  className,
  variant,
  outline,
  ...props
}: BadgeProps) => {
  const badgeClass = `badge p-2 ${outline ? "badge-outline" : ""} ${
    variant ? badgeVariants[variant] : ""
  } ${className || ""}`.trim();
  return <div className={badgeClass} {...props} />;
};