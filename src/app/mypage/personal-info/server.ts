"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type TAddressFormData = {
  prefecture: string;
  city: string;
  address1: string;
  address2?: string;
  postalCode?: string;
};

/**
 * 住所情報を登録する
 * @param formData 商品情報が入力されたFormData
 * @todo バリデーションなど
 */
export const addAddress = async (formData: FormData) => {
  const prefecture = formData.get("prefecture")?.toString();
  const city = formData.get("city")?.toString();
  const address1 = formData.get("address1")?.toString();
  const address2 = formData.get("address2")?.toString();
  const postalCode = formData.get("postalCode")?.toString();

  if (!prefecture || !city || !address1) {
    return "必要な項目が存在しません";
  }

  await insertAddress({
    prefecture: prefecture,
    city: city,
    address1: address1,
    address2: address2,
    postalCode: postalCode,
  });
  redirect("/mypage");
};

/**
 * 商品を追加する
 * @param address 住所情報
 * @returns 追加された商品
 */
export const insertAddress = async (address: TAddressFormData) => {
  const insertedAddress = await prisma.address.create({
    data: address,
  });
  return insertedAddress;
};
