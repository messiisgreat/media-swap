"use client";

import { LegalLinksList } from "@/app/(contents)/signin/LegalLinksList";
import { Button } from "@/ui";
import { signIn } from "next-auth/react";
import { useCallback } from "react";

/**
 * ログインページ
 */
export function SignIn({ callbackUrl }: { callbackUrl: string }) {
  const handleSignIn = useCallback(
    () => signIn("google", { callbackUrl }),
    [callbackUrl],
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
        <p className="mb-6 text-gray-600">
          以下のボタンからログインしてください。
        </p>
        <Button
          onClick={handleSignIn}
          className="mb-6 inline-flex w-full items-center justify-center rounded-lg bg-orange-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-600 focus:ring-4 focus:ring-orange-300"
        >
          Googleでログイン
        </Button>
        <div className="text-gray-600">
          <p className="mb-4">
            登録ボタンをクリックすると、以下に同意したものとみなされます：
          </p>
        </div>
        <LegalLinksList />
      </div>
    </div>
  );
}
