"use client";
import { useForm } from "react-hook-form";
import FormSubmitButton from "@/components/FormSubmitButton";
import { addAddress } from "@/app/mypage/personal-info/server";
import { toast } from "react-hot-toast";
import PrefectureSelectForm from "@/app/mypage/personal-info/PrefectureSelectForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { PREFECTURE } from "./prefecture";
import { z } from "zod";

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

type TAddressForm = z.infer<typeof AddressFormSchema>;

/**
 *住所変更ページ
 */
export default function Page() {
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

  console.log(errors);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit, onSubmitError)}
    >
      <label>
        <span>郵便番号</span>
        <div>
          <input
            type="number"
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
        <span>都道府県</span>
        <div>
          <select
            autoComplete="shipping address-level1"
            className="rounded-md border border-gray-300 px-3 py-2"
            defaultValue={"東京都"}
            {...register("prefecture")}
          >
            {PREFECTURE.map((prf) => {
              return (
                <option key={prf} value={prf}>
                  {prf}
                </option>
              );
            })}
          </select>
          {errors && errors.prefecture && (
            <p className="text-xs italic text-red-500">
              {errors.prefecture.message}
            </p>
          )}
        </div>
      </label>
      <label>
        <span>{"市区町村 (例: 川崎市川崎区)"}</span>
        <input
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
        <span>{"町域・番地(例: 旭町1-1)"}</span>
        <input
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
        <span>{"建物名など(例: ○○マンション101号)"}</span>
        <input
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
