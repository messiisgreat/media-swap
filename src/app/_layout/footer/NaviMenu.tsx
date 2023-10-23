import Link from "next/link";
import { useState } from "react";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineBell,
  AiFillBell,
  AiOutlineCamera,
  AiFillCamera,
} from "react-icons/ai";
import { SlUser } from "react-icons/sl";
import { ImUser } from "react-icons/im";

type NavItem = "home" | "bell" | "camera" | "user";

export const NaviMenu = () => {
  const [activeItem, setActiveItem] = useState<NavItem>("home");

  const handleClick = (itemName: NavItem) => {
    setActiveItem(itemName);
  };

  const createNavItem = (
    itemName: NavItem,
    IconActive: React.ElementType,
    IconInactive: React.ElementType,
    iconText: string,
    href: string,
  ) => {
    const isActive = activeItem === itemName;

    return (
      <Link
        href={href}
        className="btn btn-ghost flex-1 p-1"
        onClick={() => handleClick(itemName)}
        passHref
      >
        <div className="flex flex-col items-center">
          {isActive ? (
            <IconActive className="text-2xl" />
          ) : (
            <IconInactive className="text-2xl" />
          )}
          <div className="text-xs">{iconText}</div>
        </div>
      </Link>
    );
  };

  return (
    <div className="navbar flex-auto justify-center bg-gray-100">
      {createNavItem("home", AiFillHome, AiOutlineHome, "ホーム", "/")}
      {createNavItem("bell", AiFillBell, AiOutlineBell, "お知らせ", "/")}
      {createNavItem("camera", AiFillCamera, AiOutlineCamera, "出品", "/")}
      {createNavItem("user", ImUser, SlUser, "マイページ", "/")}
    </div>
  );
};
