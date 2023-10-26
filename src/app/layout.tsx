import { ClientProvider, Container, Footer, Header } from "@/app/_layout";
import { GoogleTagManager } from "@/app/_layout/GoogleTagManager";
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
        </ClientProvider>
      </body>
    </html>
  );
}
