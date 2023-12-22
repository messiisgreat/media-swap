"use client";
import { ThreeDotsIcon } from "@/app/_layout/header/menuButton/ThreeDotsIcon";
import useCloseDetailsOnOutsideClick from "@/ui/button/menuButton/hooks";
import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type OptionMenuProps = {
  className?: string;
  items?: ReactNode[];
};
/**
 * オプションメニュー
 * @param {OptionMenuProps} props - オプションメニューのプロパティ
 * @returns
 */
export const OptionMenu = (props: OptionMenuProps) => {
  const { dropdownRef } = useCloseDetailsOnOutsideClick();
  const className = twMerge(
    "menu dropdown-content menu-sm z-30 w-52 rounded-box bg-base-100 shadow",
    props.className,
  );
  return (
    <details ref={dropdownRef} className="dropdown">
      <summary className="btn btn-circle btn-ghost ">
        <ThreeDotsIcon />
      </summary>
      <ul className={className}>
        {props.items?.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </details>
  );
};
