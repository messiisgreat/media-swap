import { Main } from "@/components/structure";
import { ReactNode } from "react";

/**
 * 画面幅に応じてメインコンテンツの横幅を調整し、中央寄せにするコンポーネント
 * @returns main
 */
export const Container = ({ children }: { children: ReactNode }) => {
  return (
    <Main className="container flex min-h-[640px] flex-col items-center justify-center gap-4 p-4 sm:mx-auto">
      {children}
    </Main>
  );
};
