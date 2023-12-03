"use client";

import { purchasing } from "@/app/listing/[id]/actions";
import { Button } from "@/ui";
import { useFormActionModal } from "@/ui/dialog/useFormActionModal";
import { H } from "@/ui/structure/H";
import { Listing } from "@prisma/client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ComponentProps, useCallback } from "react";
import toast from "react-hot-toast";

type Props = ComponentProps<typeof Button> & {
  /** 購入する出品オブジェクト */
  listing: Listing;
  /** 購入するユーザーID */
  buyerId?: string;
  /** 購入するユーザークーポンID */
  userCouponId: string | null;
};

/**
 * 購入ボタンコンポーネントをレンダリングします。
 * @returns React.Fragment > Button, FormActionModal
 */
export const PurchaseButton = ({
  listing,
  buyerId,
  userCouponId,
  ...props
}: Props) => {
  const router = useRouter();

  const handleOnClick = useCallback(async () => {
    if (!buyerId) {
      signIn();
    }
    const result = await purchasing(listing.id, userCouponId);
    if (result.isSuccess) {
      router.push(`/transactions/${result.value.transactionId}`);
    } else {
      toast.error(result.error.errorMessage);
    }
  }, [buyerId, listing, userCouponId, router]);

  const { open, FormActionModal } = useFormActionModal(handleOnClick, "購入");

  return (
    <>
      <Button onClick={open} {...props}>
        購入手続きへ
      </Button>
      <FormActionModal>
        <H className="text-center text-lg font-bold">購入の確認</H>
        <p className="py-2">この商品を購入してもよろしいですか？</p>
        <div className="mb-4 flex flex-col gap-2 " role="alert">
          <div className="flex justify-between">
            <div>商品名</div>
            <div>{listing.productName}</div>
          </div>
          <div className="flex justify-between">
            <div>送料の情報</div>
            <div>{listing.postageIsIncluded ? "送料込" : "着払"}</div>
          </div>
          <div className="flex justify-between">
            <div>購入価格</div>
            <div>{listing.price}円</div>
          </div>
        </div>
      </FormActionModal>
    </>
  );
};
