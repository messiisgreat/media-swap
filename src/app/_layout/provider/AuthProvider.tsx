"use client";

import { type SessionUser } from "@/utils";
import { createContext, useContext } from "react";

const AuthContext = createContext<SessionUser | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
  sessionUser: SessionUser | undefined;
};

/**
 * ログインユーザーのコンテキスト
 */
export const AuthProvider = ({ children, sessionUser }: AuthProviderProps) => (
  <AuthContext.Provider value={sessionUser}>{children}</AuthContext.Provider>
);

/**
 * コンテキストからログインしているユーザー情報を取得する
 */
export const useSessionUser = () => useContext(AuthContext);
