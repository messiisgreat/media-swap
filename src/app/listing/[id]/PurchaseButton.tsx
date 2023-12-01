"use client";

import { purchasing } from "@/app/listing/[id]/actions";
import { Button } from "@/components/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ComponentProps, useCallback } from "react";
import { useFormActionModal } from "@/components/dialog/useFormActionModal";
import toast from "react-hot-toast";

type Props = ComponentProps<typeof Button> & {
  listingId: string;
  buyerId: string;
  userCouponId: string | null;
};

/**
 * 商品購入ボタン
 * @param param0.productId 商品ID
 * @returns button
 */
export const PurchaseButton = ({
  listingId,
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
    const transactionId = await purchasing(listingId, userCouponId);
    router.push(`/transactions/${transactionId}`);
  }, [buyerId, listingId, userCouponId, router]);

  const { open, FormActionModal } = useFormActionModal(handleOnClick, "購入");

  return (
    <>
      <Button onClick={open} {...props}>
        購入手続きへ
      </Button>
      <FormActionModal>商品名</FormActionModal>
    </>
  );
};
