"use client";
import { useForm } from "react-hook-form";
import FormSubmitButton from "@/components/FormSubmitButton";
import { addAddress } from "@/app/mypage/personal-info/server";
import { toast } from "react-hot-toast";
import PrefectureSelectForm from "@/app/mypage/personal-info/PrefectureSelectForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { PREFECTURE } from "./prefecture";

import { z } from "zod";

// TODO: 他でも使用するならutilディレクトリに移動
// 値が空文字の場合はnullに変換する
// const castToValOrNull = <T extends Parameters<typeof z.preprocess>[1]>(
//   schema: T,
// ) =>
//   z.preprocess((val) => {
//     if (typeof val === "string") {
//       const trimmedVal = val.trim();
//       return trimmedVal.length > 0 ? trimmedVal : null;
//     }
//     return null;
//   }, schema);

// export const sampleFormSchema = z.object({
//   postalCode: string
//   prefecture: string
//   city: string
//   addressLine1: string
//   addressLine2?: string | null
//   phoneNumber: string
// });

// export type SampleFormSchema = z.infer<typeof sampleFormSchema>;

export const AddressFormSchema = z.object({
  postalCode: z.string(),
  prefecture: z.string(),
  city: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string(),
  phoneNumber: z.string(),
});

type TAddressForm = z.infer<typeof AddressFormSchema>;

/**
 *住所変更ページ
 */
export default function Page() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<TAddressForm>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: undefined,
    // resolver: zodResolver(sampleFormSchema),
  });

  // TODO: react-hook-formが入った後に厳密に型に対応。
  const onSubmit = async (formData: TAddressForm) => {
    console.log(formData);
    // try {
    //   const response = await addAddress(formData);
    //   if (typeof response === "string") {
    //     toast.error(response);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const onSubmitError = () => {
    // TODO: アラートみたいなのだす
    console.log("--フォームでエラーが発生しました。--");
  };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit, onSubmitError)}
    >
      <label>
        <span>郵便番号</span>
        <div>
          <input
            type="text"
            minLength={7}
            maxLength={8}
            pattern="\d*"
            autoComplete="shipping postal-code"
            className="rounded-md border border-gray-300 px-3 py-2"
            placeholder="例: 1234567"
            {...register("postalCode", {
              required: "姓を入力してください",
            })}
          />
        </div>
      </label>
      <label>
        <span>都道府県</span>
        <div>
          <select
            name="prefecture"
            autoComplete="shipping address-level1"
            className="rounded-md border border-gray-300 px-3 py-2"
            defaultValue={"東京都"}
          >
            {PREFECTURE.map((prf) => {
              return (
                <option key={prf} value={prf}>
                  {prf}
                </option>
              );
            })}
          </select>
        </div>
      </label>
      <label>
        <span>{"市区町村 (例: 川崎市川崎区)"}</span>
        <input
          type="text"
          autoComplete="shipping address-level2"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="川崎市川崎区"
          {...register("city", {
            required: "姓を入力してください",
          })}
        />
      </label>
      <label>
        <span>{"町域・番地(例: 旭町1-1)"}</span>
        <input
          type="text"
          autoComplete="shipping address-line1"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="旭町1-1"
          {...register("addressLine1", {
            required: "姓を入力してください",
          })}
        />
      </label>
      <label>
        <span>{"建物名など(例: ○○マンション101号)"}</span>
        <input
          type="text"
          autoComplete="shipping address-line2"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="○○マンション101号"
          {...register("addressLine2", {
            required: "姓を入力してください",
          })}
        />
      </label>
      <FormSubmitButton>住所を登録する</FormSubmitButton>
    </form>
  );
}
