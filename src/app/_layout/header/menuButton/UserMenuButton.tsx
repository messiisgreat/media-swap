"use client";

import { useRef } from "react";

import Image from "next/image";
import Link from "next/link";

import { SignOutButton } from "@/app/_layout/header/menuButton/SignOutButton";
import { menuButtonConstants } from "@/app/_layout/header/menuButton/constants";
import { useMenuButtonClickHandler } from "@/app/_layout/header/menuButton/hooks";
import { PAGE_CONTENT_ENUM_JA, PAGE_LINK } from "@/constants/myPage";
import profilePicPlaceholder from "@/images/profile-pic-placeholder.png";
import { type SessionUser } from "@/utils";

/**
 * ヘッダーに表示するユーザーボタン (サインイン/サインアウト)
 * @returns
 */
export const UserMenuButton = ({
  sessionUser,
}: {
  sessionUser: SessionUser;
}) => {
  const ref = useRef<HTMLDetailsElement>(null);
  useMenuButtonClickHandler(ref);

  return (
    <details ref={ref} className="dropdown">
      <summary className="btn btn-circle btn-ghost">
        <Image
          src={sessionUser.image || profilePicPlaceholder}
          alt="プロフィール画像"
          width={40}
          height={40}
          className="w-10 rounded-full"
        />
      </summary>
      <ul className="menu dropdown-content menu-lg absolute right-0 z-30 mt-3 w-64 rounded-box bg-base-100 p-2 shadow md:menu-md md:w-52">
        <li>
          <Link href="/mypage">
            <div className="grid">
              <p className="text-base font-bold md:text-sm">
                {sessionUser.name}
              </p>
              <p className="text-sm text-zinc-400 md:text-xs">
                {sessionUser.email}
              </p>
            </div>
          </Link>
        </li>
        {menuButtonConstants.map((Menu) => (
          <li key={Menu.PAGE_CONTENT}>
            <Link href={PAGE_LINK[Menu.PAGE_CONTENT]}>
              <Menu.Icon /> {PAGE_CONTENT_ENUM_JA[Menu.PAGE_CONTENT]}
            </Link>
          </li>
        ))}
        <li>
          <SignOutButton />
        </li>
      </ul>
    </details>
  );
};
