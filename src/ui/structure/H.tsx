// このファイルでは見出しタグの使用を許可する必要があるため、ESLintの該当ルールを無効化しています。
// これはHコンポーネントが見出しタグを抽象化するためのものであり、直接的な使用を避けるためのものです。
/* eslint-disable react/forbid-elements */
"use client";

import { useLevel } from "@/ui/structure/context";
import { HTMLProps, ReactNode } from "react";

type Props = HTMLProps<HTMLHeadingElement> & {
  children: ReactNode;
};

/**
 * ページの階層に応じてH1~H6を返す
 * @returns HTMLHeadingElement H1~H6
 */
export const H = ({ children, ...props }: Props) => {
  const level = useLevel();
  switch (level) {
    case 1:
      return <h1 {...props}>{children}</h1>;
    case 2:
      return <h2 {...props}>{children}</h2>;
    case 3:
      return <h3 {...props}>{children}</h3>;
    case 4:
      return <h4 {...props}>{children}</h4>;
    case 5:
      return <h5 {...props}>{children}</h5>;
    case 6:
      return <h6 {...props}>{children}</h6>;
    default:
      return <h1 {...props}>{children}</h1>;
  }
};
