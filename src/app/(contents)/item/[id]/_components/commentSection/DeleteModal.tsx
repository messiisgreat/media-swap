import { useCallback } from "react";

import { useSetAtom } from "jotai";
import { type Session } from "next-auth";
import toast from "react-hot-toast";
import { FaFlag } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";

import { commentsAtom } from "@/app/(contents)/item/[id]/_components/commentSection/state";
import { removeComment } from "@/app/(contents)/item/[id]/actions";
import { useFormActionModal } from "@/features/modal";
import { H } from "@/ui/structure/H";

type Props = {
  commentId: string | null;
  sessionUser: Session["user"] | null;
  isItemOwner: boolean;
};

/**
 * コメントの削除モーダル
 */
export const useDeleteModal = ({
  commentId,
  sessionUser,
  isItemOwner,
}: Props) => {
  const setComments = useSetAtom(commentsAtom);

  const deleteComment = useCallback(async () => {
    if (!commentId) {
      toast.error("削除するコメントが選択されていません");
      return;
    }

    if (!sessionUser) {
      toast.error("ログインしてください");
      return;
    }

    if (!isItemOwner) {
      toast.error("商品の出品者のみがコメントを削除できます");
      return;
    }

    try {
      await removeComment(commentId);
      toast.success("コメントを削除しました。");
      setComments((prev) =>
        prev!.filter((comment) => comment.id !== commentId),
      );
    } catch (e: unknown) {
      toast.error("コメントの削除に失敗しました。");
    }
  }, [commentId, sessionUser, isItemOwner, setComments]);

  const { handleOpen: open, FormActionModal } = useFormActionModal(
    deleteComment,
    "削除",
  );

  const DeleteModal = useCallback(
    () => (
      <FormActionModal>
        <H className="text-center text-lg font-bold">コメントの削除</H>
        <p className="py-2">コメントを削除してもよろしいですか？</p>
        <div className="alert alert-warning mb-4" role="alert">
          <FaTriangleExclamation className="text-2xl" />
          <p>この操作は取り消せません。</p>
        </div>
        <div className="alert mb-4" role="alert">
          <FaFlag className="text-2xl" />
          <p>
            利用規約に違反しているコメントの場合は、先に通報を行ってください。
          </p>
        </div>
      </FormActionModal>
    ),
    [FormActionModal],
  );
  return { openDeleteModal: open, DeleteModal };
};
