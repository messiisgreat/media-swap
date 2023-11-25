"use client";

import { PriceInput } from "@/app/add-listing/PriceInput";
import {
  ListingTagInput,
  SubmitContainer,
  TestDataButton,
  initialProductFormValues,
  listingItem,
} from "@/app/add-listing/_listingForm";
import {
  LimitInput,
  LimitTextarea,
  Select,
  useFormMessageToaster,
} from "@/components/form";
import ImageInput from "@/components/form/imageInput";
import { TitleUnderbar } from "@/components/structure";
import {
  POSTAGE_IS_INCLUDED,
  PRODUCT_CONDITION,
  SHIPPING_DAYS,
  SHIPPING_METHOD,
} from "@/constants/listing";
import { objToAssociative } from "@/utils/converter";
import { Tag } from "@prisma/client";
import { useCallback, useId } from "react";
import { useFormState } from "react-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

/**
 * 商品を登録するためのフォーム
 * @param param0.tags タグ
 * @returns form
 */
export const ListingForm = ({ tags }: { tags: Tag[] }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const imageInputId = useId();
  const [state, dispatch] = useFormState(listingItem, initialProductFormValues);
  useFormMessageToaster(state);

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) return;
    return executeRecaptcha("add_listing");
  }, [executeRecaptcha]);

  const action = async (f: FormData) => {
    const verificationCode = await handleReCaptchaVerify();
    f.append("verificationCode", verificationCode || "");
    dispatch(f);
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
        placeholder="商品の説明を入力してください"
        required
        maxLength={1000}
        defaultValue={state.values.description}
      />
      <ListingTagInput
        tags={tags}
        name="tags"
        placeholder="タグ名を入力してください"
      />
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
