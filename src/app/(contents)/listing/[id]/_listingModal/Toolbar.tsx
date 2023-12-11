"use client";
import { type Session } from "next-auth";
import { FaEllipsisVertical, FaFlag, FaTrash } from "react-icons/fa6";

import { useDeleteModal } from "@/app/(contents)/listing/[id]/_listingModal/DeleteModal";
import { useReportModal } from "@/app/(contents)/listing/[id]/_listingModal/ReportModal";
import { twMerge } from "tailwind-merge";

type Props = {
  /** 商品ID */
  listingId: string;
  /** ログインユーザー */
  sessionUser: Session["user"] | null;
  /** 出品者かどうか */
  isListingOwner: boolean;
  /** className */
  className?: string;
};

/**
 * 削除/通報用のツールバー
 * @todo 編集もここかも
 * @returns
 */
export default function Toolbar({
  listingId,
  sessionUser,
  isListingOwner,
  className = "",
}: Props) {
  const { handleReportModalOpen, ReportModal } = useReportModal({
    listingId,
    sessionUser,
  });
  const { handleDeleteModalOpen, DeleteModal } = useDeleteModal({
    listingId,
    sessionUser,
    isListingOwner,
  });

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
