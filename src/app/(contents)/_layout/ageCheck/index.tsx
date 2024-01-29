"use client";

import {
  useAgeCheckCookie,
  useAgeCheckModal,
} from "@/app/(contents)/_layout/ageCheck/hooks";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * 年齢確認機能を提供する
 * cookieに年齢確認情報がない場合に、年齢確認モーダルを表示する
 * @returns div
 */
export const AgeCheckProvider = () => {
  const path = usePathname();
  const isAgeCheckedThrough = useAgeCheckCookie();
  const open = useAgeCheckModal();

  useEffect(() => {
    if (!isAgeCheckedThrough) {
      open();
    }
  }, [isAgeCheckedThrough, open, path]);

  if (isAgeCheckedThrough) return null;

  return (
    <div
      className="fixed left-0 top-0 z-30 size-full backdrop-blur-xl"
      aria-hidden
    />
  );
};
