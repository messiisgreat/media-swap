"use client";

import { addAgeCheckedCookie } from "@/app/age-check/actions";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

class CookieError extends Error {}

/**
 * 年齢確認ボタンを取りまとめるコンポーネント
 * はいをクリック: 確認済みフラグをCookieに追加してトップに遷移
 * いいえをクリック: /no-available-service に遷移
 * @returns div > buton div > link
 */
export const AgeCheckContents = () => {
  const [loading, setLoading] = useState(false);
  const linkClass =
    "h-12 btn btn-circle btn-wide border-gray-500 text-lg font-bold";

  const onClickYes = () => {
    if (loading) return;

    setLoading(true);
    try {
      addAgeCheckedCookie();
    } catch (e: unknown) {
      throw new CookieError("Cookieの保存に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid justify-center gap-8 md:grid-cols-2">
      <button
        className={twMerge(
          "btn-error bg-red-500 text-white hover:bg-red-700 md:col-start-2 md:col-end-3",
          linkClass,
        )}
        onClick={() => onClickYes()}
        disabled={loading}
      >
        はい
      </button>
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
