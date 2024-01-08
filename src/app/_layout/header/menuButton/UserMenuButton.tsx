import Image from "next/image";
import Link from "next/link";

import { SignOutButton } from "@/app/_layout/header/menuButton/SignOutButton";
import { menuButtonConstants } from "@/app/_layout/header/menuButton/constants";
import { PAGE_CONTENT_ENUM_JA, PAGE_LINK } from "@/constants/myPage";
import profilePicPlaceholder from "@/images/profile-pic-placeholder.png";
import { DropdownContainer, DropdownItem } from "@/ui/dropdownMenu";
import { type SessionUser } from "@/utils";

/**
 * ヘッダーに表示するユーザーアイコンのボタン
 * クリックでマイページなどへのリンクを表示する
 * @returns details
 */
export const UserMenuButton = ({
  sessionUser,
}: {
  sessionUser: SessionUser;
}) => {
  const menuItems = [
    <Link key="mypage" href="/mypage/item">
      <div className="grid">
        <p className="text-base font-bold md:text-sm">{sessionUser.name}</p>
        <p className="text-sm text-zinc-400 md:text-xs">{sessionUser.email}</p>
      </div>
    </Link>,
    ...menuButtonConstants.map((Menu) => (
      <Link key={Menu.PAGE_CONTENT} href={PAGE_LINK[Menu.PAGE_CONTENT]}>
        <Menu.Icon /> {PAGE_CONTENT_ENUM_JA[Menu.PAGE_CONTENT]}
      </Link>
    )),
    <SignOutButton key="signout" />,
  ];
  return (
    <DropdownContainer>
      <DropdownItem menuItems={menuItems}>
        <div
          className="btn btn-circle btn-ghost"
          role="button"
          aria-label="ユーザーメニュー"
        >
          <Image
            src={sessionUser.image || profilePicPlaceholder}
            alt="プロフィール画像"
            width={40}
            height={40}
            className="size-10 rounded-full"
          />
        </div>
      </DropdownItem>
    </DropdownContainer>
  );
};
