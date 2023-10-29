"use client";

import { ProductTagInput } from "@/app/add-product/ProductTag";
import { addProduct } from "@/app/add-product/action";
import { ImageInput, Input, Textarea } from "@/components/FormElements";
import FormSubmitButton from "@/components/FormSubmitButton";
import { useSecurityVerifier } from "@/components/securityVerifier/useSecurityVerifier";
import { Tag } from "@prisma/client";
import { useId } from "react";
import { toast } from "react-hot-toast";

/**
 * 商品を登録するためのフォーム
 * @param param0.tags タグ
 * @returns form
 */
export const ProductForm = ({ tags }: { tags: Tag[] }) => {
  const [verifiedValue, SecurityVerifier] = useSecurityVerifier();
  const imageInputId = useId();

  /**
   * 商品を登録する。エラーが発生した場合はトーストを表示する。
   * @param formData フォームデータ
   */
  const action = async (formData: FormData) => {
    const e = await addProduct(formData, verifiedValue);
    if (typeof e === "string") {
      toast.error(e);
    }
  };

  return (
    <form action={action} className="flex flex-col gap-3">
      <Input required name="name" placeholder="商品名" />
      <Textarea required name="description" placeholder="説明文"></Textarea>
      <ImageInput id={imageInputId} name="imageFile" />
      <Input
        required
        name="price"
        placeholder="10000"
        min={0}
        inputMode="numeric"
        type="number"
      />
      <ProductTagInput tags={tags} />
      <SecurityVerifier />
      <FormSubmitButton className="btn-block">出品する</FormSubmitButton>
    </form>
  );
};
