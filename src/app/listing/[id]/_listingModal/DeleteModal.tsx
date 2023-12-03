import { removeListing } from "@/app/listing/[id]/actions";
import { useFormActionModal } from "@/ui/dialog/useFormActionModal";
import { H } from "@/ui/structure/H";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { FaFlag } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";

type Props = {
  listingId: string;
  sessionUser: Session["user"] | null;
  isListingOwner: boolean;
};

/**
 * コメントの削除モーダル
 */
export const useDeleteModal = ({
  listingId,
  sessionUser,
  isListingOwner,
}: Props) => {
  const router = useRouter();
  const deleteListing = useCallback(async () => {
    if (!sessionUser) {
      toast.error("ログインしてください");
      return;
    }

    if (!isListingOwner) {
      toast.error("商品の出品者のみが商品を削除できます");
      return;
    }

    try {
      await removeListing(listingId);
      toast.success("商品を削除しました。");
      router.push("/");
    } catch (e: unknown) {
      toast.error("商品の削除に失敗しました。");
    }
  }, [listingId, sessionUser, isListingOwner, router]);

  const { open, FormActionModal } = useFormActionModal(deleteListing, "削除");

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
  return { openDeleteModal: open, DeleteModal };
};
