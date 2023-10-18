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
    "h-12 w-full rounded-full border-gray-500 text-lg flex items-center justify-center font-bold sm:w-56 sm:mr-10 sm:mb-4 mb-4";

  return (
    <div className="w-full items-center justify-center sm:flex">
      <Link
        href="/no-available-service"
        className={`bg-white text-black hover:bg-gray-100 ${linkClass}`}
      >
        いいえ
      </Link>
      <Link
        href="/"
        className={`bg-red-500 text-white hover:bg-red-600 ${linkClass}`}
        onClick={handleYes}
      >
        はい
      </Link>
    </div>
  );
};
