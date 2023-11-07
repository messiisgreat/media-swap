"use client";

import { addListing } from "@/app/add-listing/actions";
import { ListingTagInput } from "@/app/add-listing/ListingTagInput";
import { ImageInput, Input, Select, Textarea } from "@/components/FormElements";
import FormSubmitButton from "@/components/FormSubmitButton";
import { useSecurityVerifier } from "@/components/securityVerifier/useSecurityVerifier";
import { TitleUnderbar } from "@/components/TitleUnderbar";
import { Tag } from "@prisma/client";
import { useId } from "react";
import toast from "react-hot-toast";

/**
 * 商品を登録するためのフォーム
 * @param param0.tags タグ
 * @returns form
 */
export const ListingForm = ({ tags }: { tags: Tag[] }) => {
  const [verifiedValue, SecurityVerifier] = useSecurityVerifier();
  const imageInputId = useId();
  const productState = [
    "選択してください",
    "未使用品",
    "大きな傷有り",
    "その他",
  ];
  const postage = [
    "選択してください",
    "送料込み(出品者負担)",
    "着払い(購入者負担)",
  ];
  const shippingMethod = ["選択してください", "クリックポスト"];
  const deliveryTime = [
    "選択してください",
    "1~2日で発送",
    "2~3日で発送",
    "4~7日で発送",
  ];

  const action = async (formData: FormData) => {
    const e = await addListing(formData, verifiedValue);
    typeof e === "string" && toast.error(e);
  };
  return (
    <form action={action} className="flex flex-col gap-3">
      <ImageInput
        labelText="出品画像(最大10枚)"
        id={imageInputId}
        name="imageFile"
      />
      <Input labelText="商品名" characterLimit={10} name="name" required />
      <TitleUnderbar title="商品の説明" />
      <Select labelText="商品の状態" options={productState} />
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
      <Select labelText="配送料の負担" options={postage} />
      <Select labelText="配送の方法" options={shippingMethod} />
      <Select labelText="発送までの日数" options={deliveryTime} />
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
