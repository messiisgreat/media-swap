"use client";

import { addAgeCheckedCookie } from "@/app/(contents)/_layout/ageCheck/actions";
import { ageCheckCookieKey } from "@/app/(contents)/_layout/ageCheck/constants";
import { useCheckModal } from "@/features/modal/useCheckModal";
import { H } from "@/ui/structure/H";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * 年齢確認済みフラグをCookieから取得する
 * @returns 年齢確認済みかどうか
 */
export const useAgeCheckCookie = () => {
  const cookies = useCookies();
  const ageCheckCookie = cookies.get(ageCheckCookieKey);
  const isAgeCheckedThrough = ageCheckCookie === "true";
  return isAgeCheckedThrough;
};

/**
 * 年齢確認モーダル
 * @returns open, AgeCheckModal
 */
export const useAgeCheckModal = () => {
  const router = useRouter();
  const { open, CheckModal } = useCheckModal(
    addAgeCheckedCookie, // 'はい' を選択した場合に実行されるべき処理
    () => router.push("/no-available-service"), // 'いいえ' を選択した場合に実行されるべき処理
  );

  const AgeCheckModal = useCallback(
    () => (
      <div className="grid justify-center gap-8 bg-black md:grid-cols-2">
        <CheckModal hasNotClosableOverlay>
          <H className="text-2xl">年齢確認</H>
          <H className="my-4 text-lg font-bold">あなたは18歳以上ですか？</H>
          <p className="text-xs">
            ここから先は、アダルトコンテンツが含まれる可能性がありますので、
          </p>
          <p className="mb-10 text-xs">
            18歳以上の方のみがご利用いただけます。
          </p>
        </CheckModal>
      </div>
    ),
    [CheckModal],
  );
  return { open, AgeCheckModal };
};
