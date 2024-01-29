"use client";
import { useCallback } from "react";

import { FaTriangleExclamation } from "react-icons/fa6";

import { leaveUser } from "@/app/(contents)/(auth)/mypage/settings/leave/_components/leaveButton/actions";
import { useFormActionModal } from "@/ui/modal";
import { useSetModal } from "@/ui/modal/modalProvider/ModalProvider";
import { H } from "@/ui/structure/H";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

/**
 * 退会モーダル
 * @param userId ユーザーID
 */
export const useLeaveModal = (userId: string) => {
  const handleLeaveUser = useCallback(async () => {
    const result = await leaveUser(userId);
    if (result.isSuccess) {
      await signOut({ callbackUrl: "/" });
    } else {
      toast.error(result.error);
    }
  }, [userId]);

  const { handleOpen, FormActionModal } = useFormActionModal(
    handleLeaveUser,
    "退会する",
  );

  const LeaveModal = useCallback(
    () => (
      <FormActionModal>
        <H className="text-center text-lg font-bold">退会</H>
        <p className="py-2">本当に退会してもよろしいですか？</p>
        <div className="alert alert-warning mb-4" role="alert">
          <FaTriangleExclamation className="text-2xl" />
          <p>この操作は取り消せません。</p>
        </div>
      </FormActionModal>
    ),
    [FormActionModal],
  );

  useSetModal(<LeaveModal />);

  return handleOpen;
};
