"use client";

import { signIn } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * callbackURL付きサインインページへリダイレクトする
 * このコンポーネントが呼ばれるとリダイレクトしてしまうので、必ず条件付きで呼び出す
 * server componentから呼び出すためにhooksではなく関数コンポーネントとして実装
 * @example
 * ```tsx
 * {user ? null : <AuthRedirect />}
 * ```
 */
export const AuthRedirect = async () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const callbackURL = `${pathname}?${searchParams.toString()}`;
  await signIn(undefined, { callbackUrl: callbackURL });
  return null;
};
