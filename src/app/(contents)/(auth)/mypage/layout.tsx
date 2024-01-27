import { LayoutProvider } from "@/app/(contents)/(auth)/mypage/LayoutProvider";
import { Section } from "@/ui/structure";
import { type ReactNode } from "react";

/**
 * マイページのレイアウト
 */
const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <LayoutProvider />
    <Section className="grid w-full gap-4">{children}</Section>
  </>
);

export default Layout;
