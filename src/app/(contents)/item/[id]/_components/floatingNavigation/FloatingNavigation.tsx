"use client";

import { useScrollingState } from "@/app/_layout/hooks";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/**
 * 下部ナビゲーションメニューの上部に表示するフローティングメニュー
 * Compositionで内部にServer Componentを表示可能
 */
export function FloatingNavigation({ children }: Props) {
  const isScroll = useScrollingState();
  return (
    <div
      className={`fixed bottom-16 left-0 z-10 w-full border-y border-gray-200 bg-gray-100 p-2 transition-transform md:hidden ${
        isScroll ? "translate-y-32" : "translate-y-0"
      }`}
    >
      {children}
    </div>
  );
}
