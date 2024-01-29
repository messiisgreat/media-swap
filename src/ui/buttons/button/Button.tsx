import { memo, type ComponentProps } from "react";

import Link from "next/link";
import { twMerge } from "tailwind-merge";

type CommonProps = {
  /** ボタンの色を反転するかどうか */
  outline?: boolean;
  /** ボタンの色 */
  secondary?: boolean;
  /** ボタンを丸くするかどうか */
  rounded?: boolean;
};

type ButtonProps = ComponentProps<"button"> & CommonProps;

type LinkProps = ComponentProps<typeof Link> & CommonProps;

/**
 * ボタンコンポーネント
 * @returns
 */
export const Button = memo(
  ({
    outline = false,
    secondary = false,
    rounded = false,
    children,
    className,
    type = "button",
    ...props
  }: ButtonProps) => {
    const variant = twMerge(
      outline ? "btn-outline" : "",
      secondary ? "btn-secondary" : "btn-primary",
      rounded ? "rounded-full" : "",
    );
    return (
      <button
        className={twMerge("btn", variant, className)}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export const ButtonAsLink = memo(
  ({
    outline = false,
    secondary = false,
    rounded = false,
    children,
    className,
    ...props
  }: LinkProps) => {
    const variant = twMerge(
      outline ? "btn-outline" : "",
      secondary ? "btn-secondary" : "btn-primary",
      rounded ? "rounded-full" : "",
    );
    return (
      <Link className={twMerge("btn", variant, className)} {...props}>
        {children}
      </Link>
    );
  },
);

ButtonAsLink.displayName = "ButtonAsLink";
