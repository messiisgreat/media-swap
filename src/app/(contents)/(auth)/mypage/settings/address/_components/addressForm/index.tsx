"use client";

import { addressFormAction } from "@/app/(contents)/(auth)/mypage/settings/address/_components/addressForm/actions";
import { getInitialValues } from "@/app/(contents)/(auth)/mypage/settings/address/_components/addressForm/utils";
import { AddressFormContents } from "@/features/addressFormContents";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useForm, type FormOptions } from "@/ui/form/hooks";
import { type Address } from "@prisma/client";

type Props = {
  /** ユーザー名 */
  userName: string;
  /** 初期値の住所 */
  address: Omit<Address, "id" | "userId"> | null;
};

/**
 * ユーザーの住所を変更するフォーム
 * @returns form > Input, Select, SubmitButton
 */
export const AddressForm = ({ address, userName }: Props) => {
  const initialValues = getInitialValues(address, userName);
  const formOptions: FormOptions = {
    authenticationRequired: true,
    showToast: true,
  };
  const { Form, register } = useForm(
    addressFormAction,
    initialValues,
    formOptions,
  );

  return (
    <Form className="grid gap-3">
      <AddressFormContents register={register} />
      <SubmitButton>更新</SubmitButton>
    </Form>
  );
};
