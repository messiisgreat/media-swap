"use client";
import { addCommentReport } from "@/app/listing/[id]/actions";
import FormSubmitButton from "@/components/FormSubmitButton";
import { useDialog } from "@/components/dialog";
import { LimitTextarea } from "@/components/form/LimitElements";
import { H } from "@/components/structure/H";
import { Session } from "next-auth";
import { useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";

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
  const { open, close, Dialog } = useDialog();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) return;
    return executeRecaptcha("report_comment");
  }, [executeRecaptcha]);

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

      const verificationCode = await handleReCaptchaVerify();

      if (!verificationCode) {
        toast.error("reCAPTCHAの検証に失敗しました。");
        return;
      }

      try {
        const res = await addCommentReport(
          commentId,
          sessionUser.id,
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
      } finally {
        close();
      }
    },
    [close, handleReCaptchaVerify, commentId, sessionUser],
  );

  const ReportModal = useCallback(
    () => (
      <Dialog>
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <H className="text-center text-lg font-bold">コメントの通報</H>
          <p className="py-2">
            こちらはコメントの違反報告用のフォームです。基本的に返信は行っておりませんので予めご了承ください。虚偽の通報はペナルティの対象になりますのでご注意ください。
          </p>
          <form
            className="flex flex-col gap-4"
            action={(f) => reportComment(f)}
          >
            <LimitTextarea
              className="h-24"
              placeholder="通報理由を入力してください"
              required
              minLength={3}
              name="report_reason"
              maxLength={1000}
            />
            <FormSubmitButton className="btn-error">通報する</FormSubmitButton>
          </form>
        </div>
      </Dialog>
    ),
    [Dialog, reportComment],
  );

  return { openReportModal: open, closeReportModal: close, ReportModal };
};
