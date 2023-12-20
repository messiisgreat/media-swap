"use client";

import { useCallback, useEffect, useRef } from "react";

import { type Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import profilePicPlaceholder from "@/images/profile-pic-placeholder.png";
import { ThreeDotsIcon } from "@/app/_layout/header/ThreeDotsIcon";

type UserMenuButtonProps = {
  session: Session | null;
};
/**
 * ヘッダーに表示するユーザーボタン (サインイン/サインアウト)
 * @returns
 */
export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  const dropdownRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const detailsElement = dropdownRef.current;

      if (event.target instanceof HTMLElement) {
        const target = event.target;

        if (
          detailsElement &&
          (!detailsElement.contains(target) || target.closest("li"))
        ) {
          detailsElement.removeAttribute("open");
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleSignOut = useCallback(() => {
    void signOut({ callbackUrl: "/" });
  }, []);

  const handleSignIn = useCallback(() => {
    void signIn();
  }, []);

  return (
    <details ref={dropdownRef} className="dropdown">
      <summary className="btn btn-circle btn-ghost">
        {user ? (
          <Image
            src={user?.image || profilePicPlaceholder}
            alt="Profile picture"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        ) : (
          <ThreeDotsIcon />
        )}
      </summary>
      <ul className="menu dropdown-content menu-sm absolute right-0 z-30 mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
        {user ? (
          <>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
            <li>
              <Link href="/mypage">マイページ</Link>
            </li>
          </>
        ) : (
          <button onClick={handleSignIn}>Sign In</button>
        )}
      </ul>
    </details>
  );
}
