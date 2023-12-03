import { Main } from "@/ui/structure";
import { ReactNode } from "react";

/**
 * 画面幅に応じてメインコンテンツの横幅を調整し、中央寄せにするコンポーネント
 * @returns main
 */
export const Container = ({ children }: { children: ReactNode }) => {
  return (
    <Main className="container mx-auto flex min-h-[640px] flex-col items-center justify-start gap-4 p-4 max-sm:w-full sm:max-w-2xl">
      {children}
    </Main>
  );
};
