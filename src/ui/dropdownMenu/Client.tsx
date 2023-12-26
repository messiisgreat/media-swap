"use client";

import { useMenuButtonClickHandler } from "@/ui/dropdownMenu/hooks";
import { useRef, type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"details"> & {
  children: React.ReactNode;
};

/**
 * 外側クリックで閉じるドロップダウンの枠を提供するコンポーネント\
 * Compositionで子コンポーネントにDropdownItemを配置して使用する
 * @returns details
 * @example
 * ```tsx
 * <DropdownContainer>
 *  <DropdownItem menuItems={menuItems}>
 *   <div className="btn btn-primary">ボタン</div>
 *  </DropdownItem>
 * </DropdownContainer>
 * ```
 * menuItemsはJSX.Elementの配列を渡すことで、ドロップダウンの中身を作成できる
 */
export const DropdownContainer = ({ className, ...props }: Props) => {
  const ref = useRef<HTMLDetailsElement>(null);
  useMenuButtonClickHandler(ref);
  return (
    <details ref={ref} className={twMerge("dropdown", className)} {...props} />
  );
};
