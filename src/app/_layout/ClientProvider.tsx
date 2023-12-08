"use client";

import { type ReactNode } from "react";

import { SessionProvider } from "next-auth/react";

import { useViewport } from "@/app/_layout/viewPort";

/**
 * サイト全体に適用するcontextや、client側実行コードを設定するコンポーネント
 * @returns nested providers
 */
export const ClientProvider = ({ children }: { children: ReactNode }) => {
  useViewport();
  return <SessionProvider>{children}</SessionProvider>;
};
