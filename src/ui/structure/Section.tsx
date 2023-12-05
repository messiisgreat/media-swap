"use client";

import { ComponentProps } from "react";

import { HeadingLevelContext, useLevel } from "@/ui/structure/context";

/**
 * HTMLのsection要素のラッパー
 * 階層に応じて見出しレベルを下げる
 * @returns section
 */
export const Section = ({ children, ...props }: ComponentProps<"section">) => {
  const level = useLevel();
  const nextLevel = Math.min(6, level + 1);
  return (
    <HeadingLevelContext.Provider value={{ level: nextLevel }}>
      <section {...props}>{children}</section>
    </HeadingLevelContext.Provider>
  );
};
