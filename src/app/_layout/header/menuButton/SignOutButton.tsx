"use client";

import { signOut } from "next-auth/react";
import { useCallback } from "react";
import { FaSignOutAlt } from "react-icons/fa";

/**
 * メニュー内のサインアウトボタン
 */
export const SignOutButton = () => {
  const handleSignOut = useCallback(() => {
    void signOut({ callbackUrl: "/" });
  }, []);
  return (
    <button onClick={handleSignOut}>
      <FaSignOutAlt /> サインアウト
    </button>
  );
};
