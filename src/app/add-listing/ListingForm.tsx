"use client";

import { addListing } from "@/app/add-listing/actions";
import { ListingTagInput } from "@/app/add-listing/ListingTagInput";
import { ImageInput, Input, Textarea } from "@/components/FormElements";
import FormSubmitButton from "@/components/FormSubmitButton";
import { useSecurityVerifier } from "@/components/securityVerifier/useSecurityVerifier";
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

  return (
    <form
      action={async (f) => {
        const e = await addListing(f, verifiedValue);
        typeof e === "string" && toast.error(e);
      }}
      className="flex flex-col gap-3"
    >
      <Input required name="productName" placeholder="商品名" />
      <Textarea required name="description" placeholder="説明文"></Textarea>
      <ImageInput id={imageInputId} name="imageFiles" />
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
