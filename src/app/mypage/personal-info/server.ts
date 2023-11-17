"use server";

import { createAddress } from "@/services/address";
import { getSessionUser } from "@/utils";
import { TAddressForm } from "./AddressForm";

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
