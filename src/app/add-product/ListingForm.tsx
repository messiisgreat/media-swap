"use client";

import { ListingTagInput } from "@/app/add-product/ListingTagInput";
import { listingFormAction } from "@/app/add-product/action";
import { ImageInput, Input, Textarea } from "@/components/FormElements";
import FormSubmitButton from "@/components/FormSubmitButton";
import { useSecurityVerifier } from "@/components/securityVerifier/useSecurityVerifier";
import { Tag } from "@prisma/client";
import { useId } from "react";

/**
 * 商品を登録するためのフォーム
 * @param param0.tags タグ
 * @returns form
 */
export const ListingForm = ({ tags }: { tags: Tag[] }) => {
  const [verifiedValue, SecurityVerifier] = useSecurityVerifier();
  const imageInputId = useId();

  return (
    <form
      action={(f) => listingFormAction(f, verifiedValue)}
      className="flex flex-col gap-3"
    >
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
      <ListingTagInput
        tags={tags}
        name="tags"
        placeholder="タグ名を入力してください"
      />
      {SecurityVerifier}
      <FormSubmitButton>出品する</FormSubmitButton>
    </form>
  );
};
