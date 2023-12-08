"use client";

import { signIn } from "next-auth/react";

/**
 * callbackURL付きサインインページへリダイレクトする
 * このコンポーネントが呼ばれるとリダイレクトしてしまうので、必ず条件付きで呼び出す
 * server componentから呼び出すためにhooksではなく関数コンポーネントとして実装
 * @example
 * ```tsx
 * {user ? null : <AuthRedirect />}
 * ```
 */
export const AuthRedirect = () => {
  signIn();
  return null;
};
