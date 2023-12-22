"use client";

import { Button } from "@/ui";
import { signIn } from "next-auth/react";
import { useCallback } from "react";
import { FaSignInAlt } from "react-icons/fa";

/**
 * サインインボタン
 */
export const SignInButton = () => {
  const handleSignIn = useCallback(() => {
    void signIn();
  }, []);
  return (
    <Button onClick={handleSignIn} title="サインイン">
      <FaSignInAlt size="1.5rem" />
      <span className="hidden md:inline">サインイン</span>
    </Button>
  );
};
