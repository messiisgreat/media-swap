"use client";

import {
  addItemReport,
  removeItem,
} from "@/app/(contents)/item/[itemId]/_components/toolbar/actions";
import { useSessionUser } from "@/app/_layout/provider/AuthProvider";
import { handleCtrlEnterSubmit } from "@/ui/form";
import { LimitTextarea } from "@/ui/form/inputs/LimitElements";
import { useVerify } from "@/ui/form/securityVerifier/hooks";
import { useFormActionModal } from "@/ui/modal";
import { useSetModal } from "@/ui/modal/modalProvider";
import { H } from "@/ui/structure/H";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { FaFlag } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";

/**
 * 出品の削除モーダル
 * @param itemId 商品ID
 * @param isItemOwner 出品者かどうか
 */
export const useDeleteModal = (itemId: string, isItemOwner: boolean) => {
  const router = useRouter();
  const sessionUser = useSessionUser();
  const deleteItem = useCallback(async () => {
    if (!sessionUser) {
      toast.error("ログインしてください");
      return;
    }

    if (!isItemOwner) {
      toast.error("商品の出品者のみが商品を削除できます");
      return;
    }

    try {
      await removeItem(itemId);
      toast.success("商品を削除しました。");
      router.push("/");
    } catch (e: unknown) {
      toast.error("商品の削除に失敗しました。");
    }
  }, [itemId, sessionUser, isItemOwner, router]);

  const { handleOpen, FormActionModal } = useFormActionModal(
    deleteItem,
    "削除",
  );

  const DeleteModal = useCallback(
    () => (
      <FormActionModal>
        <H className="text-center text-lg font-bold">商品の削除</H>
        <p className="py-2">商品を削除してもよろしいですか？</p>
        <div className="alert alert-warning mb-4" role="alert">
          <FaTriangleExclamation className="text-2xl" />
          <p>この操作は取り消せません。</p>
        </div>
        <div className="alert mb-4" role="alert">
          <FaFlag className="text-2xl" />
          <p>
            一時的に出品を停止したい場合は、商品の編集画面から「出品を停止する」を選択してください。
          </p>
        </div>
      </FormActionModal>
    ),
    [FormActionModal],
  );

  useSetModal(<DeleteModal />);

  return handleOpen;
};

/**
 * 出品の通報モーダル
 * @param itemId 商品ID
 * @returns open, close, ReportModal
 */
export const useReportModal = (itemId: string) => {
  const getVerificationCode = useVerify();
  const sessionUser = useSessionUser();

  const reportItem = useCallback(
    async (f: FormData) => {
      const reason = f.get("report_reason")?.toString();

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

  useSetModal(<ReportModal />);

  return handleOpen;
};
