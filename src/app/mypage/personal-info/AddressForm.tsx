"use client";
import { insertAddress } from "@/app/mypage/personal-info/server";
import { Input, Select, SubmitButton } from "@/components/form";
import { PREFECTURE_OBJ } from "@/constants/prefectures";
import { objToAssociative } from "@/utils/converter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const AddressFormSchema = z.object({
  postalCode: z
    .string()
    .length(7, { message: "ハイフンなしの7文字で入力してください" }),
  prefecture: z.string().min(1, { message: "必須項目です" }),
  city: z.string().min(1, { message: "必須項目です" }),
  addressLine1: z.string().min(1, { message: "必須項目です" }),
  addressLine2: z.string().nullable(),
  phoneNumber: z
    .string({
      invalid_type_error: "数字で入力してください",
    })
    .min(7, { message: "7文字以上で入力ください" })
    .max(12, { message: "記号なし12文字以内で入力してください" }),
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
  const [, startTransition] = useTransition();
  const onSubmit = async (formData: TAddressForm) => {
    startTransition(async () => {
      try {
        await insertAddress(formData);
      } catch (e) {
        // TODO: アラートみたいなのだす
        console.log(e);
      }
      router.push("/mypage");
    });
  };

  const onSubmitError = () => {
    // TODO: アラートみたいなのだす
    console.log("--フォームでエラーが発生しました。--");
  };

  return (
    // TODO:以下のPRがreact-hook-formにマージされたら、useTransitionを使わなくて良くなりそうなのでその時に修正する
    // https://github.com/react-hook-form/react-hook-form/pull/11061
    <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
      <div>
        <Input
          labelText="郵便番号"
          autoComplete="shipping postal-code"
          placeholder="例: 1234567"
          {...register("postalCode")}
        />
        {errors && errors.postalCode && (
          <p className="text-xs italic text-red-500">
            {errors.postalCode.message}
          </p>
        )}
      </div>
      <div>
        <Select
          labelText="都道府県"
          options={objToAssociative(PREFECTURE_OBJ)}
          autoComplete="shipping address-level1"
          defaultValue={"東京都"}
          {...register("prefecture")}
        />
        {errors && errors.prefecture && (
          <p className="text-xs italic text-red-500">
            {errors.prefecture.message}
          </p>
        )}
      </div>
      <Input
        labelText="市区町村 (例: 川崎市川崎区)"
        type="text"
        autoComplete="shipping address-level2"
        placeholder="川崎市川崎区"
        {...register("city")}
      />
      {errors && errors.city && (
        <p className="text-xs italic text-red-500">{errors.city.message}</p>
      )}
      <Input
        labelText="町域・番地(例: 旭町1-1)"
        type="text"
        autoComplete="shipping address-line1"
        placeholder="旭町1-1"
        {...register("addressLine1")}
      />
      {errors && errors.addressLine1 && (
        <p className="text-xs italic text-red-500">
          {errors.addressLine1.message}
        </p>
      )}
      <Input
        labelText="建物名など(例: ○○マンション101号)"
        type="text"
        autoComplete="shipping address-line2"
        placeholder="○○マンション101号"
        {...register("addressLine2")}
      />
      {errors && errors.addressLine2 && (
        <p className="text-xs italic text-red-500">
          {errors.addressLine2.message}
        </p>
      )}
      <Input
        labelText="電話番号"
        type="tel"
        autoComplete="shipping phone-number"
        placeholder="09000000000"
        {...register("phoneNumber")}
      />
      {errors && errors.phoneNumber && (
        <p className="text-xs italic text-red-500">
          {errors.phoneNumber.message}
        </p>
      )}
      <SubmitButton>更新</SubmitButton>
    </form>
  );
}
