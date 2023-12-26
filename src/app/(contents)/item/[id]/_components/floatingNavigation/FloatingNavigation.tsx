import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/**
 * 下部ナビゲーションメニューの上部に表示するフローティングメニュー
 */
export const FloatingNavigation = ({ children }: Props) => (
  <div className="fixed bottom-12 left-0 z-10 w-full border-y border-gray-200 bg-gray-100 p-2 transition-transform md:hidden">
    {children}
  </div>
);
