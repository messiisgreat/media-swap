"use client";

import { CommentCard } from "@/app/(contents)/item/[id]/_components/commentContainer/commentList/CommentCard";
import {
  useCommentDeleteModal,
  useCommentReportModal,
} from "@/app/(contents)/item/[id]/_components/commentContainer/commentList/hooks";
import { type ItemCommentsReadResult } from "@/repositories/itemComment";

import { type SessionUser } from "@/utils";

import { useState } from "react";

type Props = {
  /** コメント一覧 */
  comments: ItemCommentsReadResult;
  /** ログインユーザー */
  sessionUser: SessionUser | undefined;
  /** 出品者かどうか */
  isItemOwner: boolean;
};

/**
 * コメント一覧
 * 通報ボタンまたは削除ボタンを押したときにモーダルを表示する
 * 選択中のコメントIDをstateで保持し、モーダルを表示するとき用に利用する
 * モーダルはパフォーマンスのため1つだけ親コンポーネントで保持する
 */
export const CommentList = ({ comments, sessionUser, isItemOwner }: Props) => {
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null,
  );
  const { openReportModal, ReportModal } = useCommentReportModal(
    selectedCommentId,
    sessionUser,
  );
  const { openDeleteModal, DeleteModal } = useCommentDeleteModal(
    selectedCommentId,
    sessionUser,
    isItemOwner,
  );
  if (comments.length === 0) {
    return <p className="text-center">コメントはありません。</p>;
  }

  return (
    <ul className="grid gap-6">
      {comments.map((comment) => {
        const handleReport = () => {
          setSelectedCommentId(comment.id);
          openReportModal();
        };

        const handleDelete = () => {
          setSelectedCommentId(comment.id);
          openDeleteModal();
        };

        return (
          <li key={comment.id} className="">
            <CommentCard
              {...{
                comment,
                sessionUser,
                isItemOwner,
                onReport: handleReport,
                onDelete: handleDelete,
              }}
            />
          </li>
        );
      })}
      <ReportModal />
      <DeleteModal />
    </ul>
  );
};
