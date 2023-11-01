"use client";

import { ProductTagInput } from "@/app/add-product/ProductTagInput";
import { productFormAction } from "@/app/add-product/action";
import { ImageInput, Input, Textarea, Select } from "@/components/FormElements";
import FormSubmitButton from "@/components/FormSubmitButton";
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
  const items = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
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
      <Input labelText="商品名" labelFooter={"0/40"} name="name" required />
      <label className="text-lg">商品の詳細</label>
      <hr className="border-t-2 border-gray-300" />
      <Textarea labelText="商品説明" labelFooter={"100/1000"} name="description" required>
      </Textarea>
      <Input
        labelText="販売価格"
        type="number"
        name="price"
        placeholder="￥"
        min={0}
        inputMode="numeric"
        required
      />
      <Select optionItems={items}/>
      <ProductTagInput
        tags={tags}
        name="tags"
        placeholder="タグ名を入力してください"
      />
      {SecurityVerifier}
      <FormSubmitButton>出品する</FormSubmitButton>
    </form>
  );
};
