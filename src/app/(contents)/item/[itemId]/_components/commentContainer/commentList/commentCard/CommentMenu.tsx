import { MeetballsButton } from "@/ui/buttons/iconButton";
import { DropdownContainer } from "@/ui/dropdownMenu/Client";
import { DropdownItem } from "@/ui/dropdownMenu/Shared";
import { FaTrash } from "react-icons/fa6";

type Props =
  | {
      onDelete?: () => void;
      onReport?: () => void;
    }
  | {
      onDelete: () => void;
      onReport?: never;
    }
  | {
      onReport: () => void;
      onDelete?: never;
    };
/**
 * コメント用ドロップダウンメニュー
 * 受け取った関数を元に、削除ボタンと通報ボタンをドロップダウンで表示する
 * @returns details
 */
export const CommentMenu = ({
  onDelete: handleDelete,
  onReport: handleReport,
}: Props) => {
  const deleteMenu = handleDelete && (
    <div
      role="button"
      className="flex items-center whitespace-nowrap text-red-500 max-sm:text-sm"
      onClick={handleDelete}
    >
      <FaTrash />
      削除する
    </div>
  );

  const reportMenu = handleReport && (
    <div
      role="button"
      className="flex items-center whitespace-nowrap text-red-500 max-sm:text-sm"
      onClick={handleReport}
    >
      <FaTrash />
      通報する
    </div>
  );
  const menuItems = [
    ...(deleteMenu ? [deleteMenu] : []),
    ...(reportMenu ? [reportMenu] : []),
  ];
  return (
    <DropdownContainer className="dropdown-end dropdown-bottom">
      <DropdownItem menuItems={menuItems}>
        <MeetballsButton
          className="h-[initial] min-h-0 p-2"
          aria-label="コメントメニュー"
        />
      </DropdownItem>
    </DropdownContainer>
  );
};
