"use client";

import { CommentCard } from "@/app/(contents)/item/[itemId]/_components/commentContainer/commentList/commentCard";
import {
  useItemCommentDeleteModal,
  useItemCommentReportModal,
} from "@/app/(contents)/item/[itemId]/_components/commentContainer/commentList/hooks";
import { isCommentOwner } from "@/app/(contents)/item/[itemId]/_components/commentContainer/commentList/utils";
import { useSessionUser } from "@/app/_layout/provider/AuthProvider";
import { type ItemCommentsReadResult } from "@/repositories/itemComment";

import { useCallback, useState } from "react";

type Props = {
  /** コメント一覧 */
  comments: ItemCommentsReadResult;
  /** 出品者かどうか */
  isItemOwner: boolean;
};

/**
 * コメント一覧
 * 通報ボタンまたは削除ボタンを押したときにモーダルを表示する
 * 選択中のコメントIDをstateで保持し、モーダルを表示するとき用に利用する
 * モーダルはパフォーマンスのため1つだけ親コンポーネントで保持する
 */
export const CommentList = ({ comments, isItemOwner }: Props) => {
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null,
  );
  const sessionUser = useSessionUser();
  const hasDeletable =
    isItemOwner || isCommentOwner(selectedCommentId, comments, sessionUser);
  const openReportModal = useItemCommentReportModal(selectedCommentId);
  const openDeleteModal = useItemCommentDeleteModal(
    selectedCommentId,
    hasDeletable,
  );

  const handleReport = useCallback(
    (commentId: string) => () => {
      setSelectedCommentId(commentId);
      openReportModal();
    },
    [openReportModal],
  );

  const handleDelete = useCallback(
    (commentId: string) => () => {
      setSelectedCommentId(commentId);
      openDeleteModal();
    },
    [openDeleteModal],
  );

  if (comments.length === 0) {
    return <p className="text-center">コメントはありません。</p>;
  }

  return (
    <ul className="grid gap-6">
      {comments.map((comment) => (
        <li key={comment.id} className="">
          <CommentCard
            {...{
              comment,
              sessionUser,
              isItemOwner,
              onReport: handleReport(comment.id),
              onDelete: handleDelete(comment.id),
            }}
          />
        </li>
      ))}
    </ul>
  );
};
