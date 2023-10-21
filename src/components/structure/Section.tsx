"use client";
import { HeadingLevelContext, useLevel } from "@/components/structure/context";
import { ComponentProps, ReactNode } from "react";

type Props = ComponentProps<"section"> & {
  children: ReactNode;
};

/**
 * HTMLのsection要素のラッパー
 * 階層に応じて見出しレベルを下げる
 * @returns section
 */
export const Section = ({ children, ...props }: Props) => {
  const level = useLevel();
  const nextLevel = Math.min(6, level + 1);
  return (
    <HeadingLevelContext.Provider value={{ level: nextLevel }}>
      <section {...props}>{children}</section>
    </HeadingLevelContext.Provider>
  );
};
