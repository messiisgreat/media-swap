import "server-only";

import prisma from "@/lib/prisma";
import { Address } from "@prisma/client";

/**
 * 住所を登録する関数
 * @param formData フォームの値
 * @returns 登録した住所
 */
export const createAddress = async (
  formData: Omit<Address, "id">,
): Promise<Address> => {
  return await prisma.address.create({
    data: { ...formData },
  });
};
