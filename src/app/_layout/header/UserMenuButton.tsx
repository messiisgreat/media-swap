"use client";

import { useCallback, useEffect, useRef } from "react";

import { type Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaSignInAlt, FaTags, FaSignOutAlt } from "react-icons/fa";
import { FaBagShopping, FaHeartCircleCheck } from "react-icons/fa6";
import { TbGitPullRequestDraft } from "react-icons/tb";

import profilePicPlaceholder from "@/images/profile-pic-placeholder.png";
import { ThreeDotsIcon } from "@/app/_layout/header/ThreeDotsIcon";
import { Button } from "@/ui";
import { PAGE_CONTENT_ENUM_JA } from "@/constants/myPage";

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
    <div className="w-full">
      {user ? (
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
          <ul className="menu dropdown-content menu-lg absolute right-0 z-30 mt-3 w-64 rounded-box bg-base-100 p-2 shadow md:menu-md md:w-52">
            <li>
              <Link href="/mypage"><div className="flex flex-col">
                <p className="text-base font-bold md:text-sm">{user.name}</p><p className="text-sm text-zinc-400 md:text-xs">{user.email}</p></div></Link>
            </li>
            <li>
              <Link href="/mypage/listings"><FaBagShopping /> {PAGE_CONTENT_ENUM_JA["items"]}</Link>
            </li>
            <li>
              <Link href="/mypage/purchases"><FaTags />{PAGE_CONTENT_ENUM_JA["purchases"]}</Link>
            </li>
            <li>
              <Link href="/mypage/draft"><TbGitPullRequestDraft /> {PAGE_CONTENT_ENUM_JA["draft"]}</Link>
            </li>
            <li>
              <Link href="/mypage/likes"><FaHeartCircleCheck /> {PAGE_CONTENT_ENUM_JA["likes"]}</Link>
            </li>
            <li>
              <button onClick={handleSignOut}><FaSignOutAlt /> サインアウト</button>
            </li>
          </ul>
        </details>
      ) : (
        <Button onClick={handleSignIn}>
          <FaSignInAlt size="1.5rem" /><span className="hidden md:inline">{" "}ログイン</span>
        </Button>
      )}
    </div>
  );
}
