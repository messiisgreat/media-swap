"use client";

import { CancelModalButton } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/sellerInfo/CancelModalButton";
import { MeetballsButton } from "@/ui/button/Icon";
import { DropdownContainer, DropdownItem } from "@/ui/dropdownMenu";
import { type SessionUser } from "@/utils";

type OptionMenuProps = {
  /** ユーザー情報 */
  sessionUser?: SessionUser;
  /** 購入者判定 */
  isBuyer?: boolean;
};
/**
 * オプションメニュー
 * @param {OptionMenuProps} props - オプションメニューのプロパティ
 * @returns
 */
export const OptionMenu = (props: OptionMenuProps) => {
  const menuItems = [<CancelModalButton key={0} {...props} />];
  return (
    <DropdownContainer>
      <DropdownItem menuItems={menuItems}>
        <MeetballsButton aria-label="取引メニュー" />
      </DropdownItem>
    </DropdownContainer>
  );
};
