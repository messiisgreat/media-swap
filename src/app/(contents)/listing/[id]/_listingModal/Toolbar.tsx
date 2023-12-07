"use client";
import { Session } from "next-auth";
import { FaEllipsis, FaFlag, FaTrash } from "react-icons/fa6";

import { useDeleteModal } from "@/app/(contents)/listing/[id]/_listingModal/DeleteModal";
import { useReportModal } from "@/app/(contents)/listing/[id]/_listingModal/ReportModal";

/**
 * 削除/通報用のツールバー
 * @todo 編集もここかも
 * @returns
 */
export default function Toolbar({
  listingId,
  sessionUser,
  isListingOwner,
}: {
  listingId: string;
  sessionUser: Session["user"] | null;
  isListingOwner: boolean;
}) {
  const { openReportModal, ReportModal } = useReportModal({
    listingId,
    sessionUser,
  });
  const { openDeleteModal, DeleteModal } = useDeleteModal({
    listingId,
    sessionUser,
    isListingOwner,
  });

  return (
    <>
      <div className="dropdown dropdown-end dropdown-bottom">
        <label tabIndex={0} className="btn btn-ghost h-[initial] min-h-0 p-2">
          <FaEllipsis />
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-24 gap-2 rounded-box bg-base-100 p-2 text-red-500 shadow"
        >
          <li
            onClick={() => {
              openReportModal();
            }}
          >
            <div className="flex items-center whitespace-nowrap">
              <FaFlag />
              通報
            </div>
          </li>
          <li
            onClick={() => {
              openDeleteModal();
            }}
          >
            <div className="flex items-center whitespace-nowrap">
              <FaTrash />
              削除
            </div>
          </li>
        </ul>
      </div>
      <ReportModal />
      <DeleteModal />
    </>
  );
}
