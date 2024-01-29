"use client";

import {
  useDeleteModal,
  useReportModal,
} from "@/app/(contents)/item/[itemId]/_components/toolbar/hooks";
import { KebabButton } from "@/ui/buttons/iconButton";
import { DropdownContainer, DropdownItem } from "@/ui/dropdownMenu";
import { FaFlag, FaTrash } from "react-icons/fa6";

import { twMerge } from "tailwind-merge";

type Props = {
  /** 商品ID */
  itemId: string;
  /** 出品者かどうか */
  isItemOwner: boolean;
  /** className */
  className?: string;
};

/**
 * 削除/通報用のツールバー
 * @returns div > deleteModal, reportModal
 */
export const Toolbar = ({ itemId, isItemOwner, className = "" }: Props) => {
  const handleDeleteModalOpen = useDeleteModal(itemId, isItemOwner);

  const handleReportModalOpen = useReportModal(itemId);

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
