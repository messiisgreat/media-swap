"use client";

import { ProductTagInput } from "@/app/add-product/ProductTagInput";
import { productFormAction } from "@/app/add-product/action";
import { ImageInput, Input, Textarea, Select } from "@/components/FormElements";
import FormSubmitButton from "@/components/FormSubmitButton";
import { TitleUnderbar } from "@/components/TitleUnderbar";
import { useSecurityVerifier } from "@/components/securityVerifier/useSecurityVerifier";
import { Tag } from "@prisma/client";
import { useId } from "react";

/**
 * 商品を登録するためのフォーム
 * @param param0.tags タグ
 * @returns form
 */
export const ProductForm = ({ tags }: { tags: Tag[] }) => {
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
  return (
    <form
      action={(f) => productFormAction(f, verifiedValue)}
      className="flex flex-col gap-3"
    >
      <ImageInput
        labelText="出品画像(最大10枚)"
        id={imageInputId}
        name="imageFile"
      />
      <Input labelText="商品名" characterLimit={10} name="name" required />
      <TitleUnderbar title="商品の説明" />
      <Select labelText="商品の状態" optionItems={productState} />
      <Textarea
        labelText="商品の説明"
        characterLimit={1000}
        name="description"
        required
      ></Textarea>
      <ProductTagInput
        tags={tags}
        name="tags"
        placeholder="タグ名を入力してください"
      />
      <TitleUnderbar title="配送について" />
      <Select labelText="配送料の負担" optionItems={postage} />
      <Select labelText="配送の方法" optionItems={shippingMethod} />
      <Select labelText="発送までの日数" optionItems={deliveryTime} />
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
