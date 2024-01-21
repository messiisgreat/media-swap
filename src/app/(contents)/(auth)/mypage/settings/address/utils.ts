import { initialAddressFormValues } from "@/app/(contents)/(auth)/mypage/settings/address/type";
import { type Address } from "@prisma/client";

/**
 * フォームに設定する住所の初期値を取得する
 * @param address 住所情報
 * @param userName ユーザー名
 */
export const getInitialValues = (
  address: Omit<Address, "id" | "userId"> | null,
  userName: string,
) => ({
  values: {
    ...initialAddressFormValues.values,
    ...address,
    name: address?.name ?? userName ?? "",
    addressLine2: address?.addressLine2 ?? "",
    verificationCode: "",
  },
});
