"use client";
import { useForm } from "react-hook-form";
import FormSubmitButton from "@/components/FormSubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { PREFECTURE_OBJ } from "./prefecture";
import { z } from "zod";
import { insertAddress } from "@/app/mypage/personal-info/server";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input, Select } from "@/components/FormElements";
import { objToAssociative } from "@/utils/converter";

export const AddressFormSchema = z.object({
  postalCode: z
    .string()
    .length(7, { message: "ハイフンなしの7文字で入力してください。" }),
  prefecture: z.string().min(1, { message: "必須項目です" }),
  city: z.string().min(1, { message: "必須項目です" }),
  addressLine1: z.string().min(1, { message: "必須項目です" }),
  addressLine2: z.string().optional(),
  // TODO: 電話番号後で追加
  // phoneNumber: z.string(),
});

export type TAddressForm = z.infer<typeof AddressFormSchema>;

/**
 *住所フォーム
 *
 */
export default function AddressForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddressForm>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: undefined,
    resolver: zodResolver(AddressFormSchema),
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const onSubmit = async (formData: TAddressForm) => {
    startTransition(async () => {
      try {
        await insertAddress(formData);
      } catch (e) {
        console.log(e);
      }
      router.push("/mypage");
    });
  };

  const onSubmitError = () => {
    // TODO: アラートみたいなのだす
    console.log("--フォームでエラーが発生しました。--");
  };

  console.log(errors);

  return (
    // TODO:以下のPRがreact-hook-formにマージされたら、useTransitionを使わなくて良くなりそうなのでその時に修正する
    // https://github.com/react-hook-form/react-hook-form/pull/11061
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit, onSubmitError)}
    >
      <label>
        <div>
          <Input
            labelText="郵便番号"
            autoComplete="shipping postal-code"
            className="rounded-md border border-gray-300 px-3 py-2"
            placeholder="例: 1234567"
            {...register("postalCode")}
          />
          {errors && errors.postalCode && (
            <p className="text-xs italic text-red-500">
              {errors.postalCode.message}
            </p>
          )}
        </div>
      </label>
      <label>
        <div>
          <Select
            labelText="都道府県"
            options={objToAssociative(PREFECTURE_OBJ)}
            autoComplete="shipping address-level1"
            className="rounded-md border border-gray-300 px-3 py-2"
            defaultValue={"東京都"}
            {...register("prefecture")}
          />
          {errors && errors.prefecture && (
            <p className="text-xs italic text-red-500">
              {errors.prefecture.message}
            </p>
          )}
        </div>
      </label>
      <label>
        <Input
          labelText="市区町村 (例: 川崎市川崎区)"
          type="text"
          autoComplete="shipping address-level2"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="川崎市川崎区"
          {...register("city")}
        />
        {errors && errors.city && (
          <p className="text-xs italic text-red-500">{errors.city.message}</p>
        )}
      </label>
      <label>
        <Input
          labelText="町域・番地(例: 旭町1-1)"
          type="text"
          autoComplete="shipping address-line1"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="旭町1-1"
          {...register("addressLine1")}
        />
        {errors && errors.addressLine1 && (
          <p className="text-xs italic text-red-500">
            {errors.addressLine1.message}
          </p>
        )}
      </label>
      <label>
        <Input
          labelText="建物名など(例: ○○マンション101号)"
          type="text"
          autoComplete="shipping address-line2"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="○○マンション101号"
          {...register("addressLine2")}
        />
        {errors && errors.addressLine2 && (
          <p className="text-xs italic text-red-500">
            {errors.addressLine2.message}
          </p>
        )}
      </label>
      <FormSubmitButton>住所を登録する</FormSubmitButton>
    </form>
  );
}
