"use client";
import { useCallback } from "react";

import {
  addCommentReport,
  removeComment,
} from "@/app/(contents)/item/[id]/_components/commentSection/actions";
import { commentsAtom } from "@/app/(contents)/item/[id]/_components/commentSection/state";

import { useFormActionModal } from "@/features/modal";
import { LimitTextarea } from "@/ui/form/LimitElements";
import { useVerify } from "@/ui/form/securityVerifier/hooks";
import { H } from "@/ui/structure/H";
import { type SessionUser } from "@/utils";
import { useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { FaFlag } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";

/**
 * コメントの通報モーダル
 * @param commentId 通報するコメントのID
 * @param sessionUser ログインユーザー
 */
export const useReportModal = (
  commentId: string | null,
  sessionUser: SessionUser | undefined,
) => {
  const getVerificationCode = useVerify();

  const reportComment = useCallback(
    async (f: FormData) => {
      const reason = f.get("report_reason") as string;

      if (!sessionUser) {
        toast.error("ログインしてください");
        return;
      }

      if (!reason || typeof reason !== "string") return;

      if (!commentId) {
        toast.error("通報するコメントが選択されていません");
        return;
      }

      if (reason.length < 3) {
        toast.error("3文字以上入力してください");
        return;
      }

      if (reason.length > 1000) {
        toast.error("1000文字以内で入力してください");
        return;
      }

      const verificationCode = await getVerificationCode();

      if (!verificationCode) {
        toast.error("reCAPTCHAの検証に失敗しました。");
        return;
      }

      try {
        const res = await addCommentReport(commentId, reason, verificationCode);
        if ("error" in res) {
          toast.error(res.message);
          return;
        }
        toast.success("コメントを通報しました。");
      } catch (e: unknown) {
        if (String(e).toLowerCase().includes("already")) {
          toast.error("あなたは既にこのコメントを通報しています。");
        }
        toast.error("コメントの通報に失敗しました。");
      }
    },
    [getVerificationCode, commentId, sessionUser],
  );

  const { handleOpen: open, FormActionModal } = useFormActionModal(
    reportComment,
    "通報する",
  );

  const ReportModal = useCallback(
    () => (
      <FormActionModal>
        <H className="text-center text-lg font-bold">コメントの通報</H>
        <p className="py-2">
          こちらはコメントの違反報告用のフォームです。基本的に返信は行っておりませんので予めご了承ください。虚偽の通報はペナルティの対象になりますのでご注意ください。
        </p>
        <LimitTextarea
          className="h-24"
          placeholder="通報理由を入力してください"
          required
          minLength={3}
          name="report_reason"
          maxLength={1000}
        />
      </FormActionModal>
    ),
    [FormActionModal],
  );

  return { openReportModal: open, ReportModal };
};

/**
 * コメントの削除モーダル
 * @param commentId 削除するコメントのID
 * @param sessionUser ログインユーザー
 * @param isItemOwner 商品の出品者かどうか
 */
export const useDeleteModal = (
  commentId: string | null,
  sessionUser: SessionUser | undefined,
  isItemOwner: boolean,
) => {
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
