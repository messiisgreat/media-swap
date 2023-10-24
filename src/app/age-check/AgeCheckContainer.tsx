"use client";

import Link from "next/link";
import { addAgeCheckedCookie } from "./server";

/**
 * 年齢確認ボタンを取りまとめるコンポーネント
 * いいえをクリック: /no-available-service に遷移
 * はいをクリック: 確認済みフラグのCookieを追加し/ に遷移
 * @returns
 */
export const AgeChechContainer = () => {
  const handleYes = () => {
    addAgeCheckedCookie();
  };

  const linkClass =
    "h-12 btn-circle btn-wide border-gray-500 text-lg font-bold";

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:gap-12">
      <Link
        href="/no-available-service"
        className={`btn bg-white text-black hover:bg-gray-100 ${linkClass}`}
      >
        いいえ
      </Link>
      <Link
        href="/"
        className={`btn btn-error bg-red-500 text-white hover:bg-red-600 ${linkClass}`}
        onClick={handleYes}
      >
        はい
      </Link>
    </div>
  );
};
