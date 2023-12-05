import { ComponentProps } from "react";

import Link from "next/link";
import { twMerge } from "tailwind-merge";

type TextLinkProps = ComponentProps<typeof Link>;

/**
 * next/linkのラッパー
 * 外部リンクを開く場合はtarget="_blank"を付与する
 * @param param0.href リンク先URL
 * @param param0.children リンクテキスト(もしくは子要素)
 * @param param0.className リンクに付与するクラス名
 * @returns TextLink
 */
export const TextLink = ({
  href,
  children,
  className,
  ...props
}: TextLinkProps) => {
  const target = href.toString().startsWith("http") ? "_blank" : undefined;
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
