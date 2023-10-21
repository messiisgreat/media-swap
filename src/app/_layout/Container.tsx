import { Section } from "@/components/structure";
import { ReactNode } from "react";

/**
 * 画面幅に応じてメインコンテンツの横幅を調整し、中央寄せにするコンポーネント
 * @returns section
 */
export const Container = ({ children }: { children: ReactNode }) => {
  return <Section className="container mx-auto lg:my-4">{children}</Section>;
};
