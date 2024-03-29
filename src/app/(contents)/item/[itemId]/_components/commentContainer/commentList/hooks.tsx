"use client";
import { useCallback } from "react";

import {
  addItemCommentReport,
  removeItemComment,
} from "@/app/(contents)/item/[itemId]/_components/commentContainer/commentList/actions";

import { useSessionUser } from "@/app/_layout/provider/AuthProvider";
import { LimitTextarea } from "@/ui/form/inputs/LimitElements";
import { useVerify } from "@/ui/form/securityVerifier/hooks";
import { useFormActionModal } from "@/ui/modal";
import { useSetModal } from "@/ui/modal/modalProvider";
import { H } from "@/ui/structure/H";
import toast from "react-hot-toast";
import { FaFlag } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";

/**
 * コメントの通報モーダル
 * @param commentId 通報するコメントのID
 * @returns モーダルを開く関数
 */
export const useItemCommentReportModal = (commentId: string | null) => {
  const getVerificationCode = useVerify();
  const sessionUser = useSessionUser();

  const reportItemComment = useCallback(
    async (f: FormData) => {
      const reason = f.get("report_reason")?.toString();

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
        const res = await addItemCommentReport(
          commentId,
          reason,
          verificationCode,
        );
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
    reportItemComment,
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

  useSetModal(<ReportModal />);

  return open;
};

/**
 * コメントの削除モーダル
 * @param commentId 削除するコメント
 * @param hasDeletable コメントが削除可能かどうか
 */
export const useItemCommentDeleteModal = (
  commentId: string | null,
  hasDeletable: boolean,
) => {
  const sessionUser = useSessionUser();

  const deleteItemComment = useCallback(async () => {
    if (!commentId) {
      toast.error("削除するコメントが選択されていません");
      return;
    }
    if (!sessionUser) {
      toast.error("ログインしてください");
      return;
    }

    if (!hasDeletable) {
      toast.error(
        "商品の出品者もしくはコメントを書込みした人のみがコメントを削除できます",
      );
      return;
    }

    const result = await removeItemComment(commentId);
    if (result.isFailure) {
      toast.error(result.error);
    } else {
      toast.success("コメントを削除しました。");
    }
  }, [commentId, sessionUser, hasDeletable]);

  const { handleOpen: open, FormActionModal } = useFormActionModal(
    deleteItemComment,
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

  useSetModal(<DeleteModal />);

  return open;
};
