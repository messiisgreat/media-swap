"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

import profilePicPlaceholder from "@/images/profile-pic-placeholder.png";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        )}
      </summary>
      <ul className="menu dropdown-content menu-sm absolute right-0 z-30 mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
        {user ? (
          <>
            <li>
              <button onClick={() => signOut({ callbackUrl: "/" })}>
                Sign Out
              </button>
            </li>
            <li>
              <Link href="/mypage">マイページ</Link>
            </li>
          </>
        ) : (
          <button onClick={() => signIn()}>Sign In</button>
        )}
      </ul>
    </details>
  );
}
