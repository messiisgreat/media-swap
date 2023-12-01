"use client";

import { purchasing } from "@/app/listing/[id]/actions";
import { Button } from "@/components/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { H } from "@/components/structure/H";
import { ComponentProps, useCallback } from "react";
import { useFormActionModal } from "@/components/dialog/useFormActionModal";
import toast from "react-hot-toast";
import { Listing } from "@prisma/client";

type Props = ComponentProps<typeof Button> & {
  listing: Listing;
  buyerId: string;
  userCouponId: string | null;
};

/**
 * 商品購入ボタン
 * @param param0.productId 商品ID
 * @returns button
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
      const signInResult = await signIn();
      if (!signInResult) {
        toast.error("ログインに失敗しました。");
        return;
      }
    }
    const transactionId = await purchasing(listing.id, userCouponId);
    router.push(`/transactions/${transactionId}`);
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
