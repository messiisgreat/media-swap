"use client";

import Link from "next/link";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { addAgeCheckedCookie } from "./actions";

/**
 * 年齢確認ボタンを取りまとめるコンポーネント
 * はいをクリック: 確認済みフラグをCookieに追加してトップに遷移
 * いいえをクリック: /no-available-service に遷移
 * @returns div > Link*2
 */
export const AgeChechContainer = () => {
  const handleAgeVerified = useCallback(() => addAgeCheckedCookie(), []);

  const linkClass =
    "h-12 btn btn-circle btn-wide border-gray-500 text-lg font-bold";

  return (
    <div className="grid w-full items-center justify-center gap-8 md:grid-cols-2 md:gap-4">
      <Link
        href="/"
        className={twMerge(
          "btn-error bg-red-500 text-white hover:bg-red-700 md:col-start-2 md:col-end-3",
          linkClass,
        )}
        onClick={handleAgeVerified}
      >
        はい
      </Link>
      <Link
        href="/no-available-service"
        className={twMerge(
          "bg-white text-black hover:bg-gray-100 md:row-start-1 md:row-end-2",
          linkClass,
        )}
      >
        いいえ
      </Link>
    </div>
  );
};
