"use client";
import { networkErrorMessage } from "@/constants/errorMessage";
import { createCodeAndSendEmail } from "@/features/emailVerification/actions";
import { Button } from "@/ui";
import { useCallback } from "react";
import toast from "react-hot-toast";

/**
 * 認証コードを再発行するボタン
 */
export const AuthEmailSendButton = () => {
  const handleSendEmail = useCallback(async () => {
    try {
      const result = await createCodeAndSendEmail();
      if (result.isSuccess) {
        toast.success(result.value);
      } else if (result.isFailure) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(networkErrorMessage);
    }
  }, []);
  return (
    <Button className="w-full" onClick={handleSendEmail}>
      認証コードを再発行する
    </Button>
  );
};
