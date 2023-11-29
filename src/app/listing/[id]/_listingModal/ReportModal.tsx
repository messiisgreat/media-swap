"use client";
import { addListingReport } from "@/app/listing/[id]/actions";
import { useFormActionModal } from "@/components/dialog/useFormActionModal";
import { LimitTextarea } from "@/components/form/LimitElements";
import { useVerify } from "@/components/form/securityVerifier/hooks";
import { H } from "@/components/structure/H";
import { Session } from "next-auth";
import { useCallback } from "react";
import toast from "react-hot-toast";

type Props = {
  listingId: string;
  sessionUser: Session["user"] | null;
};

/**
 * 商品の通報モーダル
 * @param param0.selectedComment 通報するコメントのID
 * @param param0.sessionUser ログインユーザー
 * @returns open, close, ReportModal
 */
export const useReportModal = ({ listingId, sessionUser }: Props) => {
  const getVerificationCode = useVerify();

  const reportListing = useCallback(
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
        const res = await addListingReport(
          listingId,
          reason,
          verificationCode || "",
        );
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
    [getVerificationCode, sessionUser, listingId],
  );

  const { open, FormActionModal } = useFormActionModal(
    reportListing,
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
        />
      </FormActionModal>
    ),
    [FormActionModal],
  );

  return { openReportModal: open, ReportModal };
};
