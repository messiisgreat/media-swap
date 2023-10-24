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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swappy",
  description: "フリーマーケットアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp">
      <body className={inter.className}>
        <GoogleTagManager />
        <ClientProvider>
          <Header />
          <Container>{children}</Container>
          <Footer />
          <NaviMenu />
        </ClientProvider>
      </body>
    </html>
  );
}
