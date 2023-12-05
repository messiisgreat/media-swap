"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import { usePathname } from "next/navigation";

import { pathsWithoutAgeCheck } from "@/app/_layout/ageCheck/constants";
import { useAgeCheckCookie } from "@/app/_layout/ageCheck/useAgeCheckCookies";
import { useAgeCheckModal } from "@/app/_layout/ageCheck/useAgeCheckModal";

/**
 * 年齢確認機能を提供する
 * cookieに年齢確認情報がない場合に、年齢確認モーダルを表示する
 * @returns div
 */
export const AgeCheckProvider = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const { isAgeCheckedThrough } = useAgeCheckCookie();
  const { open, AgeCheckModal } = useAgeCheckModal();

  useEffect(() => {
    if (!isAgeCheckedThrough) {
      open();
    }
  }, [isAgeCheckedThrough, open, path]);

  if (isAgeCheckedThrough || pathsWithoutAgeCheck.includes(path))
    return <>{children}</>;

  return (
    <>
      <AgeCheckModal />
      <div className="blur-lg" aria-hidden={true}>
        {children}
      </div>
    </>
  );
};
