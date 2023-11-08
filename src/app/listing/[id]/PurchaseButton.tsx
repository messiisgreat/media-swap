"use client";

import { purchasing } from "@/app/listing/[id]/actions";
import { Button } from "@/components/Button";
import { ComponentProps, useCallback } from "react";

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
  const handleOnClick = useCallback(
    async () => await purchasing(listingId, buyerId, userCouponId),
    [buyerId, listingId, userCouponId],
  );

  return (
    <Button onClick={handleOnClick} {...props}>
      購入手続きへ
    </Button>
  );
};
