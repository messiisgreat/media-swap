import { Inter } from "next/font/google";
import { CookiesProvider } from "next-client-cookies/server";
import { Toaster } from "react-hot-toast";

import {
  AgeCheckProvider,
  ClientProvider,
  Container,
  Footer,
  GoogleTagManager,
  Header,
} from "@/app/_layout";
import { AnchorMenu } from "@/app/_layout/AnchorMenu";
import "@/app/globals.css";
import { SITE_NAME, SITE_URL } from "@/constants/site";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { template: `%s - ${SITE_NAME}`, default: SITE_NAME },
  description: "フリーマーケットアプリ",
  keywords: ["同人誌", "フリマ", "コミケ", "Swappy", "スワッピー"],
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
        <CookiesProvider>
          <ClientProvider>
            <AgeCheckProvider>
              <Header />
              <Container>{children}</Container>
              <Footer />
              <Toaster />
              <AnchorMenu />
            </AgeCheckProvider>
          </ClientProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
