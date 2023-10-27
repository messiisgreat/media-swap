import {
  ClientProvider,
  Container,
  Footer,
  GoogleTagManager,
  Header,
} from "@/app/_layout";
import { NaviMenu } from "@/app/_layout/NaviMenu";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swappy",
  description: "フリーマーケットアプリ",
};

/**
 * 基本レイアウト
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <GoogleTagManager />
        <ClientProvider>
          <Header />
          <Container>{children}</Container>
          <Footer />
          <Toaster />
          <NaviMenu />
        </ClientProvider>
      </body>
    </html>
  );
}
