"use server";

import { getSessionUser } from "@/utils/getSession";
import { TAddressForm } from "./AddressForm";
import { createAddress } from "@/services/address";

/**
 * 住所を登録する関数
 * @param formData フォームの値
 */
export const insertAddress = async (formData: TAddressForm) => {
  const user = await getSessionUser();
  if (!user || !user.id) {
    // TODO: エラーハンドリングやログなど追加
    throw new Error("セッションがありません");
  }
  return createAddress({ ...formData, userId: user.id });
};
