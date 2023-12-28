"use client";

import {
  useDeleteModal,
  useReportModal,
} from "@/app/(contents)/item/[id]/_components/toolbar/hooks";
import { KebabButton } from "@/ui/button/Icon";
import { DropdownContainer, DropdownItem } from "@/ui/dropdownMenu";
import { type SessionUser } from "@/utils";
import { FaFlag, FaTrash } from "react-icons/fa6";

import { twMerge } from "tailwind-merge";

type Props = {
  /** 商品ID */
  itemId: string;
  /** ログインユーザー */
  sessionUser: SessionUser | undefined;
  /** 出品者かどうか */
  isItemOwner: boolean;
  /** className */
  className?: string;
};

/**
 * 削除/通報用のツールバー
 * @returns div > deleteModal, reportModal
 */
export const Toolbar = ({
  itemId,
  sessionUser,
  isItemOwner,
  className = "",
}: Props) => {
  const handleDeleteModalOpen = useDeleteModal(
    itemId,
    sessionUser,
    isItemOwner,
  );

  const handleReportModalOpen = useReportModal(itemId, sessionUser);

  const deleteMenu = (
    <div
      role="button"
      className="flex items-center whitespace-nowrap text-red-500"
      onClick={handleDeleteModalOpen}
    >
      <FaTrash />
      削除
    </div>
  );

  const reportMenu = (
    <div
      role="button"
      className="flex items-center whitespace-nowrap text-red-500"
      onClick={handleReportModalOpen}
    >
      <FaFlag />
      通報
    </div>
  );

  const menuItems = [deleteMenu, reportMenu];

  return (
    <DropdownContainer className={twMerge("dropdown-bottom", className)}>
      <DropdownItem menuItems={menuItems}>
        <KebabButton aria-label="商品メニュー" />
      </DropdownItem>
    </DropdownContainer>
  );
};
