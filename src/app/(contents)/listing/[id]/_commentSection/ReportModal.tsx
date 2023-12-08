"use client";
import { useCallback } from "react";

import { type Session } from "next-auth";
import toast from "react-hot-toast";

import { addCommentReport } from "@/app/(contents)/listing/[id]/actions";
import { useFormActionModal } from "@/features/modal";
import { LimitTextarea } from "@/ui/form/LimitElements";
import { useVerify } from "@/ui/form/securityVerifier/hooks";
import { H } from "@/ui/structure/H";

type Props = {
  commentId: string | null;
  sessionUser: Session["user"] | null;
};

/**
 * コメントの通報モーダル
 * @param param0.selectedComment 通報するコメントのID
 * @param param0.sessionUser ログインユーザー
 * @returns open, close, ReportModal
 */
export const useReportModal = ({ commentId, sessionUser }: Props) => {
  const getVerificationCode = useVerify();

  const reportComment = useCallback(
    async (f: FormData) => {
      const reason = f.get("report_reason") as string;

      if (!reason || typeof reason !== "string") return;

      if (reason.length < 3) {
        toast.error("3文字以上入力してください");
        return;
      }

      if (reason.length > 1000) {
        toast.error("1000文字以内で入力してください");
        return;
      }

      if (!commentId) {
        toast.error("通報するコメントが選択されていません");
        return;
      }

      if (!sessionUser) {
        toast.error("ログインしてください");
        return;
      }

      const verificationCode = await getVerificationCode();

      if (!verificationCode) {
        toast.error("reCAPTCHAの検証に失敗しました。");
        return;
      }

      try {
        const res = await addCommentReport(
          commentId,
          reason,
          verificationCode || "",
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
