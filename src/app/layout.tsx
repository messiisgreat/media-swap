import {
  ClientProvider,
  Container,
  Footer,
  GoogleTagManager,
  Header,
} from "@/app/_layout";
import { NaviMenu } from "@/app/_layout/NaviMenu";

import { SITE_NAME, SITE_URL } from "@/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { template: `%s - ${SITE_NAME}`, default: SITE_NAME },
  description: "フリーマーケットアプリ",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `同人誌フリマ ${SITE_NAME}`,
    description: "フリーマーケットアプリ",
  },
  twitter: {
    card: "summary_large_image",
  },
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
