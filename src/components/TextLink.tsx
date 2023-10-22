import Link from "next/link";
import { ComponentProps } from "react";

type TextLinkProps = ComponentProps<typeof Link>;

/**
 * next/linkのラッパー
 * 外部リンクを開く場合はtarget="_blank"を付与する
 * @param param0
 * @returns
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
      className={`text-blue-500 underline hover:text-blue-600 ${className}`}
      target={target}
      {...props}
    >
      {children}
    </Link>
  );
};
