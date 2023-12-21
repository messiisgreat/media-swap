"use client";
import useCloseDetailsOnOutsideClick from "@/ui/button/menuButton/hooks";
import { ThreeDotsIcon } from "@/app/_layout/header/ThreeDotsIcon";
import { twMerge } from "tailwind-merge";
import { type Session } from "next-auth";
import { CancelFormButton } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/sellerInfo/CancelFormButton";

type OptionMenuProps = {
  className?: string;
  sessionUser?: Session["user"];
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
        <li key="cancelFormButton">
          <CancelFormButton />
        </li>
      </ul>
    </details>
  );
};
