import Link from "next/link";
import { memo, type ComponentProps } from "react";
import { type IconType } from "react-icons";
import { FaEllipsis } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

type Common = {
  /** メニューのアイコン */
  icon: IconType;
  /** メニューに表示するテキスト */
  text: string;
  /** 文字色指定用className */
  className?: string;
};

type ActionMenu = Common & {
  onAction: () => void;
  url?: never;
};

type LinkMenu = Common & {
  url: string;
  onAction?: never;
};

/** メニューの型 関数かLinkのどちらかを渡す */
export type Menu = ActionMenu | LinkMenu;

type Props = {
  /** メニューの配列オブジェクト */
  menuList: Menu[];
} & ComponentProps<"div">;

/**
 * ドロップダウンメニュー
 */
export const DropdownMenu = memo(({ menuList, className, ...props }: Props) => (
  <div
    className={twMerge("dropdown dropdown-end dropdown-bottom", className)}
    {...props}
  >
    <label tabIndex={0} className="btn btn-ghost h-[initial] min-h-0 p-2">
      <FaEllipsis />
    </label>
    <ul
      tabIndex={0}
      className="menu dropdown-content z-[1] gap-2 rounded-box bg-base-100 p-2 shadow"
    >
      {menuList.map((item) => {
        const Icon = item.icon;
        if (item.onAction) {
          const handleAction = item.onAction;
          return (
            <li key={item.text} onClick={handleAction}>
              <div
                className={twMerge(
                  "flex items-center whitespace-nowrap",
                  item.className,
                )}
              >
                <Icon />
                {item.text}
              </div>
            </li>
          );
        } else {
          return (
            <li key={item.text}>
              <Link href={item.url}>
                <div
                  className={twMerge(
                    "flex items-center whitespace-nowrap",
                    item.className,
                  )}
                >
                  <Icon />
                  {item.text}
                </div>
              </Link>
            </li>
          );
        }
      })}
    </ul>
  </div>
));

DropdownMenu.displayName = "DropdownMenu";
