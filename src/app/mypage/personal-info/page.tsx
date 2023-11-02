"use client";

import FormSubmitButton from "@/components/FormSubmitButton";
import { addAddress } from "@/app/mypage/personal-info/server";
import { toast } from "react-hot-toast";
import PrefectureSelectForm from "@/app/mypage/personal-info/PrefectureSelectForm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TAddressFormData = {
  prefecture: string;
  city: string;
  address1: string;
  address2?: string;
  postalCode?: string;
};

/**
 * 住所変更ページ
 * TODO: フォームの細かいバリデーションなどについては、react-hook-formが入った後に対応
 */
export default function Page() {
  // TODO: react-hook-formが入った後に厳密に型に対応。
  const submit = async (formData: FormData) => {
    try {
      const response = await addAddress(formData);
      if (typeof response === "string") {
        toast.error(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="flex flex-col gap-3" action={submit}>
      <label>
        <span>郵便番号</span>
        <div>
          <input
            type="text"
            name="postal_code"
            minLength={7}
            maxLength={8}
            pattern="\d*"
            autoComplete="shipping postal-code"
            className="rounded-md border border-gray-300 px-3 py-2"
            placeholder="例: 1234567"
          />
        </div>
      </label>
      <label>
        <span>都道府県</span>
        <div>
          <PrefectureSelectForm />
        </div>
      </label>
      <label>
        <span>{"市区町村 (例: 川崎市川崎区)"}</span>
        <input
          type="text"
          name="city"
          autoComplete="shipping address-level2"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="川崎市川崎区"
        />
      </label>
      <label>
        <span>{"町域・番地(例: 旭町1-1)"}</span>
        <input
          type="text"
          name="address1"
          autoComplete="shipping address-line1"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="旭町1-1"
        />
      </label>
      <label>
        <span>{"建物名など(例: ○○マンション101号)"}</span>
        <input
          type="text"
          name="address2"
          autoComplete="shipping address-line2"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="○○マンション101号"
        />
      </label>
      <FormSubmitButton>住所を登録する</FormSubmitButton>
    </form>
  );
}
