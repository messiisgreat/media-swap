"use client";
import { useLeaveModal } from "@/app/(contents)/(auth)/mypage/settings/leave/hooks";
import { Button } from "@/ui";

type Props = {
  userId: string;
};

/**
 * プロフィールフォーム
 * @param userId ユーザーID
 * @returns form
 */
export const LeaveButton = ({ userId }: Props) => {
  const handleOpen = useLeaveModal(userId);

  return (
    <Button className="w-full" onClick={handleOpen}>
      退会する
    </Button>
  );
};
