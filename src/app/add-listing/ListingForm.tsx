"use client";

import {
  ListingTagInput,
  SubmitContainer,
  initialProductFormValues,
  listingItem,
} from "@/app/add-listing/_listingForm";
import { Input, Select, Textarea } from "@/components/form/FormElements";
import { ImageInput } from "@/components/form/ImageInput";
import {
  fetchVerifyResult,
  useSecurityVerifier,
} from "@/components/securityVerifier";
import { TitleUnderbar } from "@/components/structure";
import {
  POSTAGE_IS_INCLUDED,
  PRODUCT_CONDITION,
  SHIPPING_DAYS,
  SHIPPING_METHOD,
} from "@/constants/listing";
import { objToAssociative } from "@/utils/converter";
import { Tag } from "@prisma/client";
import { useId } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

/**
 * 商品を登録するためのフォーム
 * @param param0.tags タグ
 * @returns form
 */
export const ListingForm = ({ tags }: { tags: Tag[] }) => {
  const [verifiedValue, SecurityVerifier] = useSecurityVerifier();
  const imageInputId = useId();
  const [state, dispatch] = useFormState(listingItem, initialProductFormValues);

  const action = async (formData: FormData) => {
    if (!verifiedValue) {
      toast.error("認証を行ってください");
      return;
    }
    const verifyResult = await fetchVerifyResult(verifiedValue);
    if (!verifyResult) {
      toast.error("認証に失敗しました");
      return;
    }
    dispatch(formData);
  };
  return (
    <form
      action={action}
      className="grid grid-cols-2 gap-3 [&>*]:col-span-2 [&>button]:col-span-1"
    >
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
        defaultValue={state.values.productName}
      />
      <TitleUnderbar title="商品の説明" />
      <Select
        labelText="商品の状態"
        options={objToAssociative(PRODUCT_CONDITION)}
        name="productConditionId"
        required
        defaultValue={state.values.productConditionId}
      />
      <Textarea
        labelText="商品の説明"
        characterLimit={1000}
        name="description"
        required
        defaultValue={state.values.description}
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
        defaultValue={state.values.postageIsIncluded}
      />
      <Select
        name="shippingMethodId"
        labelText="配送の方法"
        options={objToAssociative(SHIPPING_METHOD)}
        defaultValue={state.values.shippingMethodId}
      />
      <Select
        name="shippingDaysId"
        labelText="発送までの日数"
        options={objToAssociative(SHIPPING_DAYS)}
        defaultValue={state.values.shippingDaysId}
      />
      <Input
        labelText="販売価格"
        type="number"
        name="price"
        placeholder="￥"
        min={0}
        inputMode="numeric"
        required
        defaultValue={state.values.price}
      />
      <label>販売手数料</label>
      {/* 別途コンポーネントを作成の必要あり*/}
      <label className="mb-2">販売利益</label>
      {/* 別途コンポーネントを作成の必要あり*/}
      {SecurityVerifier}
      <SubmitContainer />
    </form>
  );
};
