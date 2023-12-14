"use client";

import { type Tag } from "@prisma/client";
import { useFormState } from "react-dom";

import { listingItem } from "@/app/(contents)/(auth)/listing/_listingForm/actions";
import { ItemsFormContents } from "@/features/itemsFormContents";
import { initialProductFormValues } from "@/features/itemsFormContents/types";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useFormMessageToaster } from "@/ui/form/hooks";
import { useVerify } from "@/ui/form/securityVerifier/hooks";

/**
 * 商品を登録するためのフォーム
 * @param param0.tags タグ
 * @returns form
 */
export const ItemForm = ({ tags }: { tags: Tag[] }) => {
  const [state, dispatch] = useFormState(listingItem, initialProductFormValues);
  const getVerificationCode = useVerify();
  useFormMessageToaster(state);

  const action = async (f: FormData) => {
    const verificationCode = await getVerificationCode();
    f.append("verificationCode", verificationCode);
    dispatch(f);
  };

  return (
    <form
      action={action}
      className="grid grid-cols-2 gap-3 [&>*]:col-span-2 [&>button]:col-span-1"
    >
      <ItemsFormContents
        {...{
          ...state.values,
          tags,
        }}
      />
      <SubmitButton outline name="isPublic" value="false">
        下書きに保存する
      </SubmitButton>
      <SubmitButton name="isPublic" value="true">
        出品する
      </SubmitButton>
    </form>
  );
};
