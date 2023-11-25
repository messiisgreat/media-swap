"use client";

import { purchasing } from "@/app/listing/[id]/actions";
import { Button } from "@/components/Button";
import { ComponentProps, useCallback } from "react";
import { useRouter } from 'next/navigation'

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
    const transactionId = await purchasing(listingId, buyerId, userCouponId);
    router.push(`/transactions/${transactionId}`);
  }, [buyerId, listingId, userCouponId, router]);

  return (
    <Button onClick={handleOnClick} {...props}>
      購入手続きへ
    </Button>
  );
};
