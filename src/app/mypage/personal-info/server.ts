"use server";

import prisma from "@/lib/prisma";
import { getSessionUser } from "@/utils/getSession";
import { TAddressForm } from "./AddressForm";

/**
 * 住所を登録する関数
 * @param formData フォームの値
 */
export const insertAddress = async (formData: TAddressForm) => {
  const session = await getSessionUser();
  if (!session || !session.id) {
    // TODO: エラーハンドリングやログなど追加
    throw new Error("セッションがありません");
  }
  const insertedAddress = await prisma.address.create({
    data: { ...formData, userId: session.id },
  });
  return insertedAddress;
};
