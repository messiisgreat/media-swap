"use client";

import { ComponentProps, useCallback } from "react";

import { Listing } from "@prisma/client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { purchasing } from "@/app/listing/[id]/actions";
import { Button } from "@/ui";
import { useFormActionModal } from "@/ui/dialog/useFormActionModal";
import { H } from "@/ui/structure/H";

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
    try {
      if (!buyerId) {
        signIn();
      }
      const transaction = await purchasing(listing.id, userCouponId);
      router.push(`/transactions/${transaction}`);
    } catch (error) {
      toast.error("購入に失敗しました");
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
