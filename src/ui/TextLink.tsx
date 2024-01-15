import { type ComponentProps } from "react";

import Link from "next/link";
import { twMerge } from "tailwind-merge";

type TextLinkProps = ComponentProps<typeof Link>;

/**
 * next/linkのラッパー
 * 外部リンクを開く場合はtarget="_blank"を付与する
 * @returns TextLink
 */
export const TextLink = ({
  href,
  children,
  className,
  ...props
}: TextLinkProps) => {
  // toString()が使えないのでキャスト
  // TODO: 型判定できるようなったら修正予定
  // eslint-disable-next-line no-restricted-syntax
  const hrefString = href as string;
  const target = hrefString.startsWith("http") ? "_blank" : undefined;
  return (
    <Link
      href={href}
      className={twMerge(
        "text-blue-500 underline hover:text-blue-600",
        className,
      )}
      target={target}
      {...props}
    >
      {children}
    </Link>
  );
};
