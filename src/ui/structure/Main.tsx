"use client";

import { HeadingLevelContext, useLevel } from "@/ui/structure/context";
import { ComponentProps } from "react";

/**
 * HTMLのmain要素のラッパー
 * 階層に応じて見出しレベルを下げる
 * @returns main
 */
export const Main = ({ children, ...props }: ComponentProps<"main">) => {
  const level = useLevel();
  const nextLevel = Math.min(6, level + 1);
  return (
    <HeadingLevelContext.Provider value={{ level: nextLevel }}>
      <main {...props}>{children}</main>
    </HeadingLevelContext.Provider>
  );
};
