"use client";

import { useCancelModal } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/sellerInfo/hooks";
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
  const [handleOpen, CancelModal] = useCancelModal(props);
  return (
    <>
      <DropdownContainer>
        <DropdownItem
          menuItems={[
            <button key={0} onClick={handleOpen}>
              運営への問合わせ
            </button>,
          ]}
        >
          <MeetballsButton aria-label="取引メニュー" />
        </DropdownItem>
      </DropdownContainer>
      <CancelModal />
    </>
  );
};
