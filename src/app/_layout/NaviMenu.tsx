"use client";

import { useMediaQuery } from "@/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { AiFillBell, AiFillCamera, AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

type NaviMenu = {
  id: string;
  icon: IconType;
  text: string;
  path: string;
};

const naviMenu: NaviMenu[] = [
  {
    id: "home",
    icon: AiFillHome,
    text: "ホーム",
    path: "/",
  },
  {
    id: "bell",
    icon: AiFillBell,
    text: "お知らせ",
    path: "/notification", //TBD
  },
  {
    id: "camera",
    icon: AiFillCamera,
    text: "出品",
    path: "/exhibit", //TBD
  },
  {
    id: "user",
    icon: FaUser,
    text: "マイページ",
    path: "/mypage", //TBD
  },
];

/**
 * フッターの下部ナビゲーションメニュー
 * @returns footer
 */
export const NaviMenu = () => {
  const isMobile = useMediaQuery();
  const pathName = usePathname();

  if (!isMobile) {
    return null;
  }
  return (
    <div className="navbar fixed bottom-0 w-full flex-auto justify-center border-t border-gray-200 bg-gray-100">
      {naviMenu.map((item) => {
        const Icon = item.icon;
        return (
          <Link href={item.path} className="btn btn-ghost flex-1 p-1">
            <div className="flex flex-col items-center">
              <Icon size={24} fillOpacity={pathName === item.path ? 1 : 0.5} />
              <div className="text-xs">{item.text}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
