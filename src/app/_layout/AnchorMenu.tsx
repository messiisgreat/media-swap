/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type IconType } from "react-icons";
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
    path: "/notifications",
  },
  {
    id: "camera",
    icon: AiFillCamera,
    text: "出品",
    path: "/listing",
  },
  {
    id: "user",
    icon: FaUser,
    text: "マイページ",
    path: "/mypage",
  },
];

/**
 * フッターの下部ナビゲーションメニュー
 * @returns footer
 */
export const AnchorMenu = () => {
  const pathName = usePathname();

  return (
    <div className="fixed bottom-0 grid w-full flex-auto grid-cols-4 justify-center gap-4  border-gray-200 bg-gray-100 transition-transform md:hidden">
      {naviMenu.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.id}
            href={item.path}
            className="btn btn-ghost flex-1 p-1"
          >
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
