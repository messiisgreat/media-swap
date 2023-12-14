"use client";

import { type ReactNode } from "react";

import { useResizeViewport } from "@/app/_layout/hooks";
import { SessionProvider } from "next-auth/react";

/**
 * サイト全体に適用するcontextや、client側実行コードを設定するコンポーネント
 * @returns nested providers
 */
export const ClientProvider = ({ children }: { children: ReactNode }) => {
  useResizeViewport();
  return <SessionProvider>{children}</SessionProvider>;
};
