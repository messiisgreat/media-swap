"use client";
import { useCallback } from "react";

import { type Session } from "next-auth";
import toast from "react-hot-toast";

import { addItemReport } from "@/app/(contents)/item/[id]/actions";
import { useFormActionModal } from "@/features/modal";
import { handleCtrlEnterSubmit } from "@/ui/form";
import { LimitTextarea } from "@/ui/form/LimitElements";
import { useVerify } from "@/ui/form/securityVerifier/hooks";
import { H } from "@/ui/structure/H";

type Props = {
  itemId: string;
  sessionUser: Session["user"] | null;
};

/**
 * 出品の通報モーダル
 * @param param0.selectedComment 通報するコメントのID
 * @param param0.sessionUser ログインユーザー
 * @returns open, close, ReportModal
 */
export const useReportModal = ({ itemId, sessionUser }: Props) => {
  const getVerificationCode = useVerify();

  const reportItem = useCallback(
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
        const res = await addItemReport(itemId, reason, verificationCode);
        if ("error" in res) {
          toast.error(res.message);
          return;
        }
        toast.success("商品を通報しました。");
      } catch (e: unknown) {
        if (String(e).toLowerCase().includes("already")) {
          toast.error("あなたは既にこの商品を通報しています。");
        }
        toast.error("商品の通報に失敗しました。");
      }
    },
    [getVerificationCode, sessionUser, itemId],
  );

  const { handleOpen, FormActionModal } = useFormActionModal(
    reportItem,
    "通報する",
  );

  const ReportModal = useCallback(
    () => (
      <FormActionModal>
        <H className="text-center text-lg font-bold">商品の通報</H>
        <p className="py-2">
          こちらは商品の違反報告用のフォームです。基本的に返信は行っておりませんので予めご了承ください。虚偽の通報はペナルティの対象になりますのでご注意ください。
        </p>
        <LimitTextarea
          className="h-24"
          placeholder="通報理由を入力してください"
          required
          minLength={3}
          name="report_reason"
          maxLength={1000}
          onKeyDown={handleCtrlEnterSubmit}
        />
      </FormActionModal>
    ),
    [FormActionModal],
  );

  return { handleReportModalOpen: handleOpen, ReportModal };
};
