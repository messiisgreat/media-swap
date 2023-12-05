"use client";

import { Tag } from "@prisma/client";
import { useFormState } from "react-dom";

import {
  SubmitContainer,
  TestDataButton,
  initialProductFormValues,
  listingItem,
} from "@/app/add-listing/_listingForm";
import { ItemsFormContents } from "@/features/itemsFormContents";
import { useFormMessageToaster } from "@/ui/form/hooks";
import { useVerify } from "@/ui/form/securityVerifier/hooks";

/**
 * 商品を登録するためのフォーム
 * @param param0.tags タグ
 * @returns form
 */
export const ListingForm = ({ tags }: { tags: Tag[] }) => {
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
      <ItemsFormContents
        detailsContentsProps={{
          productName: state.values.productName,
          productConditionId: state.values.productConditionId,
          description: state.values.description,
          tags,
        }}
        deliveryContentsProps={{
          postageIsIncluded: state.values.postageIsIncluded,
          shippingMethodId: state.values.shippingMethodId,
          shippingDaysId: state.values.shippingDaysId,
          price: state.values.price,
        }}
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
