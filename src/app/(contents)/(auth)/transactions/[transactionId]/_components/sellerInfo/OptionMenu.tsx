import { CancelFormButton } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/sellerInfo/CancelFormButton";
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
export const OptionMenu = ({ sessionUser, isBuyer }: OptionMenuProps) => (
  <DropdownContainer>
    <DropdownItem
      menuItems={[<CancelFormButton key={0} {...{ sessionUser, isBuyer }} />]}
    >
      <MeetballsButton aria-label="取引メニュー" />
    </DropdownItem>
  </DropdownContainer>
);
