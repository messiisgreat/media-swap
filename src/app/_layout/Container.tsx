import { Main } from "@/components/structure";
import { ReactNode } from "react";

/**
 * 画面幅に応じてメインコンテンツの横幅を調整し、中央寄せにするコンポーネント
 * @returns main
 */
export const Container = ({ children }: { children: ReactNode }) => {
  return <Main className="flex flex-col items-center justify-center container sm:mx-auto max-sm:m-4">{children}</Main>;
};
