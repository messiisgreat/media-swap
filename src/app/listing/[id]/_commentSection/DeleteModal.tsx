import { commentsAtom } from "@/app/listing/[id]/_commentSection/state";
import { removeComment } from "@/app/listing/[id]/actions";
import { useDialog } from "@/components/dialog";
import { SubmitButton } from "@/components/form";
import { H } from "@/components/structure/H";
import { useSetAtom } from "jotai";
import { Session } from "next-auth";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { FaFlag } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";

type Props = {
  commentId: string | null;
  sessionUser: Session["user"] | null;
  isListingOwner: boolean;
};

/**
 * コメントの削除モーダル
 */
export const useDeleteModal = ({
  commentId,
  sessionUser,
  isListingOwner,
}: Props) => {
  const { open, close, Dialog } = useDialog();
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

    if (!isListingOwner) {
      toast.error("商品の出品者のみがコメントを削除できます");
      return;
    }

    try {
      await removeComment(commentId, sessionUser.id);
      toast.success("コメントを削除しました。");
      setComments((prev) =>
        prev!.filter((comment) => comment.id !== commentId),
      );
    } catch (e: unknown) {
      toast.error("コメントの削除に失敗しました。");
    } finally {
      close();
    }
  }, [commentId, sessionUser, isListingOwner, close, setComments]);

  const DeleteModal = useCallback(
    () => (
      <Dialog>
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
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
          <form className="flex flex-col gap-4" action={deleteComment}>
            <SubmitButton className="btn-error">削除</SubmitButton>
          </form>
        </div>
      </Dialog>
    ),
    [Dialog, deleteComment],
  );
  return { openDeleteModal: open, closeDeleteModal: close, DeleteModal };
};
