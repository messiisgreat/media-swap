"use client";

import { ListingTagInput } from "@/app/add-listing/ListingTagInput";
import { addListing } from "@/app/add-listing/actions";
import { ImageInput, Input, Select, Textarea } from "@/components/FormElements";
import FormSubmitButton from "@/components/FormSubmitButton";
import { TitleUnderbar } from "@/components/TitleUnderbar";
import { useSecurityVerifier } from "@/components/securityVerifier/useSecurityVerifier";
import {
  POSTAGE_IS_INCLUDED,
  PRODUCT_CONDITION,
  SHIPPING_DAYS,
  SHIPPING_METHOD,
} from "@/constants/listing";
import { objToAssociative } from "@/utils/converter";
import { Tag } from "@prisma/client";
import { useId } from "react";
import toast from "react-hot-toast";

/**
 * 商品を登録するためのフォーム
 * @param param0.tags タグ
 * @returns form
 * @todo 選択肢を定数として切り出す
 */
export const ListingForm = ({ tags }: { tags: Tag[] }) => {
  const [verifiedValue, SecurityVerifier] = useSecurityVerifier();
  const imageInputId = useId();

  const action = async (formData: FormData) => {
    const e = await addListing(formData, verifiedValue);
    typeof e === "string" && toast.error(e);
  };

  return (
    <form action={action} className="flex flex-col gap-3">
      <ImageInput
        labelText="出品画像(最大10枚)"
        id={imageInputId}
        name="imageFiles"
      />
      <Input
        labelText="商品名"
        characterLimit={10}
        name="productName"
        required
      />
      <TitleUnderbar title="商品の説明" />
      <Select
        labelText="商品の状態"
        options={objToAssociative(PRODUCT_CONDITION)}
      />
      <Textarea
        labelText="商品の説明"
        characterLimit={1000}
        name="description"
        required
      ></Textarea>
      <ListingTagInput
        tags={tags}
        name="tags"
        placeholder="タグ名を入力してください"
      />
      <TitleUnderbar title="配送について" />
      <Select
        name="postageId"
        labelText="配送料の負担"
        options={objToAssociative(POSTAGE_IS_INCLUDED)}
      />
      <Select
        name="shippingMethodId"
        labelText="配送の方法"
        options={objToAssociative(SHIPPING_METHOD)}
      />
      <Select
        name="shippingDaysId"
        labelText="発送までの日数"
        options={objToAssociative(SHIPPING_DAYS)}
      />
      <label className="text-lg">販売価格</label>
      <Input
        labelText="販売価格"
        type="number"
        name="price"
        placeholder="￥"
        min={0}
        inputMode="numeric"
        required
      />
      <label>販売手数料</label>
      {/* 別途コンポーネントを作成の必要あり*/}
      <label className="mb-2">販売利益</label>
      {/* 別途コンポーネントを作成の必要あり*/}
      {SecurityVerifier}
      <FormSubmitButton>出品する</FormSubmitButton>
    </form>
  );
};
