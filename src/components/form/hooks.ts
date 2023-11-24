"use client";

import { FormState } from "@/components/form";
import { useEffect } from "react";
import toast from "react-hot-toast";

/**
 * フォームの状態を監視し、エラーと通知をトースト表示する
 * @param formState フォームの状態
 */
export const useFormMessageToaster = <T>(formState: FormState<T>) => {
  useEffect(() => {
    Object.entries(formState.errors!).forEach((error) => {
      const [, messages] = error as [string, string[]];
      messages.forEach((message) => {
        toast.error(message);
      });
    });
  }, [formState.errors]);

  useEffect(() => {
    if (formState.message) {
      toast.error(formState.message);
    }
  }, [formState.message]);
};
