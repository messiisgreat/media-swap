"use client";

import { PriceInput } from "@/app/add-listing/PriceInput";
import {
  ListingTagsInput,
  SubmitContainer,
  TestDataButton,
  initialProductFormValues,
  listingItem,
} from "@/app/add-listing/_listingForm";
import {
  POSTAGE_IS_INCLUDED,
  PRODUCT_CONDITION,
  SHIPPING_DAYS,
  SHIPPING_METHOD,
} from "@/constants/listing";
import { Select } from "@/ui/form";
import { LimitInput, LimitTextarea } from "@/ui/form/LimitElements";
import { useFormMessageToaster } from "@/ui/form/hooks";
import ImageInput from "@/ui/form/imageInput";
import { useVerify } from "@/ui/form/securityVerifier/hooks";
import { TitleUnderbar } from "@/ui/structure";
import { objToAssociative } from "@/utils/converter";
import { Tag } from "@prisma/client";
import { useId } from "react";
import { useFormState } from "react-dom";

/**
 * 商品を登録するためのフォーム
 * @param param0.tags タグ
 * @returns form
 */
export const ListingForm = ({ tags }: { tags: Tag[] }) => {
  const imageInputId = useId();
  const [state, dispatch] = useFormState(listingItem, initialProductFormValues);
  const getVerificationCode = useVerify();
  useFormMessageToaster(state);

  const action = async (f: FormData) => {
    const verificationCode = await getVerificationCode();
    f.append("verificationCode", verificationCode || "");
    dispatch(f);
  };

  return (
    <form
      action={action}
      className="grid grid-cols-2 gap-3 [&>*]:col-span-2 [&>button]:col-span-1"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <ImageInput
        labelText="出品画像(最大10枚)"
        id={imageInputId}
        name="imageFiles"
      />
      <LimitInput
        labelText="商品名"
        maxLength={32}
        name="productName"
        placeholder="商品名を入力してください"
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
      <LimitTextarea
        labelText="商品の説明"
        name="description"
        placeholder={`内容、サイズ、ページ数、発行年月日、注意事項など\n\n例）2018年に制作した同人誌です。B5サイズで全30ページ。内容はファンタジー要素が満載で、読み応え抜群です。一部ページに軽微な折れがありますが、全体的に状態は良好です。お求めやすい価格で提供していますので、ぜひご検討ください。`}
        required
        maxLength={1000}
        rows={10}
        defaultValue={state.values.description}
      />
      <ListingTagsInput suggestedTags={tags} name="tags" />
      <TitleUnderbar title="配送について" />
      <Select
        name="postageIsIncluded"
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
      <PriceInput
        labelText="販売価格(￥300〜10,000,000)"
        name="price"
        required
        prefix="¥"
        defaultValue={state.values.price}
      />
      <SubmitContainer />
      {process.env.NODE_ENV !== "production" && (
        <TestDataButton
          className="fixed left-3 max-sm:bottom-20 sm:bottom-3"
          id="test-button"
        />
      )}
    </form>
  );
};
