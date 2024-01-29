"use client";

import { Button } from "@/ui";
import { signIn } from "next-auth/react";
import { useCallback } from "react";

/**
 * ログインボタン
 */
export const SignInButton = ({ callbackURL }: { callbackURL: string }) => {
  const handleSignIn = useCallback(
    () => signIn("google", { callbackURL }),
    [callbackURL],
  );

  return (
    <Button
      onClick={handleSignIn}
      className="mb-6 inline-flex w-full items-center justify-center rounded-lg bg-orange-500 px-5 py-2.5 text-center text-sm font-medium text-dark-bg-wh hover:bg-orange-600 focus:ring-4 focus:ring-orange-300"
    >
      Googleでログイン
    </Button>
  );
};
