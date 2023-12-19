"use client";
import {
  useDeleteModal,
  useReportModal,
} from "@/app/(contents)/item/[id]/_components/toolbar/hooks";
import { type SessionUser } from "@/utils";
import { FaEllipsisVertical, FaFlag, FaTrash } from "react-icons/fa6";

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
 * @returns div > reportModal, deleteModal
 */
export function Toolbar({
  itemId,
  sessionUser,
  isItemOwner,
  className = "",
}: Props) {
  const { handleReportModalOpen, ReportModal } = useReportModal(
    itemId,
    sessionUser,
  );
  const { handleDeleteModalOpen, DeleteModal } = useDeleteModal(
    itemId,
    sessionUser,
    isItemOwner,
  );

  return (
    <div
      className={twMerge(
        "flex items-center justify-center dropdown dropdown-bottom",
        className,
      )}
    >
      <label tabIndex={0} className="btn btn-ghost h-[initial] min-h-0 p-2">
        <FaEllipsisVertical size="1.5rem" />
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] mt-2 w-24 gap-2 rounded-box bg-base-100 p-2 shadow"
      >
        <li onClick={handleReportModalOpen}>
          <div className="flex items-center whitespace-nowrap text-red-500">
            <FaFlag />
            通報
          </div>
        </li>
        <li onClick={handleDeleteModalOpen}>
          <div className="flex items-center whitespace-nowrap text-red-500">
            <FaTrash />
            削除
          </div>
        </li>
      </ul>
      <ReportModal />
      <DeleteModal />
    </div>
  );
}
