"use client";

import { useCallback } from "react";

import { purchasing } from "@/app/(contents)/listing/[id]/_components/transactionButton/purchaseButton/actions";
import { useFormActionModal } from "@/features/modal";
import { H } from "@/ui/structure/H";
import { type Listing } from "@prisma/client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

/**
 * 購入ボタン用のモーダル
 * @param listing 購入する出品オブジェクト
 * @param buyerId 購入するユーザーID
 * @returns 購入ボタンのモーダルを開く関数とモーダルのコンポーネント
 * @todo クーポンを使う場合の処理を追加する場合、formでselect要素を使って実装する。
 */
export const usePurchaseModal = (
  /** 購入する出品オブジェクト */
  listing: Listing,
  /** 購入するユーザーID */
  buyerId: string | undefined,
) => {
  const router = useRouter();

  const action = useCallback(async () => {
    if (!buyerId) {
      await signIn();
    } else {
      const userCouponId = null;
      const result = await purchasing(listing.id, userCouponId);
      if (result.isSuccess) {
        router.push(`/transactions/${result.value}`);
      } else {
        toast.error(result.error);
      }
    }
  }, [buyerId, listing, router]);

  const { handleOpen, FormActionModal } = useFormActionModal(action, "購入");

  const PurchaseModal = useCallback(
    () => (
      <FormActionModal>
        <H className="text-center text-lg font-bold">購入の確認</H>
        <p className="py-2">この商品を購入してもよろしいですか？</p>
        <dl className="mb-4 grid grid-cols-2 gap-2 " role="alert">
          <dt>商品名</dt>
          <dd>{listing.productName}</dd>
          <dt>送料の情報</dt>
          <dd>{listing.postageIsIncluded ? "送料込" : "着払"}</dd>
          <dt>購入価格</dt>
          <dd>{listing.price}円</dd>
        </dl>
      </FormActionModal>
    ),
    [
      FormActionModal,
      listing.postageIsIncluded,
      listing.price,
      listing.productName,
    ],
  );

  return [handleOpen, PurchaseModal] as const;
};
