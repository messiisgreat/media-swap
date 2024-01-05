"use client";

import { CommentCard } from "@/app/(contents)/item/[id]/_components/commentContainer/commentList/CommentCard";
import {
  useCommentDeleteModal,
  useCommentReportModal,
} from "@/app/(contents)/item/[id]/_components/commentContainer/commentList/hooks";
import { type ItemCommentsReadResult } from "@/repositories/itemComment";

import { type SessionUser } from "@/utils";

import { useCallback, useState } from "react";

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
  const openReportModal = useCommentReportModal(selectedCommentId, sessionUser);
  const openDeleteModal = useCommentDeleteModal(
    selectedCommentId,
    sessionUser,
    isItemOwner,
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
