import { PurchaseButton } from "@/app/(contents)/item/[itemId]/_components/transactionButton/purchaseButton";
import { findItemById } from "@/repositories/item";
import { Button, ButtonAsLink } from "@/ui/buttons";
import { getSessionUser } from "@/utils";
import { type Route } from "next";

type Props = {
  /** 商品ID */
  itemId: string;
  /** className */
  className?: string;
};

/**
 * 売約状況とログインしているユーザーで表示を変えるボタン
 * @returns button
 */
export const TransactionButton = async ({ itemId, className = "" }: Props) => {
  const item = await findItemById(itemId);
  const sessionUser = await getSessionUser();
  const isSold = Boolean(item.transaction?.id);
  const isSeller = sessionUser?.id === item.sellerId;
  const isBuyer = sessionUser?.id === item.transaction?.buyerId;

  // 売り切れかつ出品者または購入者の場合
  if (item.transaction && isSold && (isSeller || isBuyer)) {
    // eslint-disable-next-line no-restricted-syntax
    const href = `/transactions/${item.transaction.id}` as Route; // TODO: なぜか型エラーになるのでas Routeを追加
    return (
      <ButtonAsLink href={href} className={className}>
        取引へ進む
      </ButtonAsLink>
    );
  }

  // 売り切れかつ、出品者でも購入者でもない場合
  if (isSold) {
    return (
      <Button disabled className={className}>
        売り切れました
      </Button>
    );
  }

  // 売り切れでなく、出品者の場合
  if (isSeller) {
    // eslint-disable-next-line no-restricted-syntax
    const href = `/item/edit/${item.id}` as Route; //todo なぜか型エラーになるのでas Routeを追加
    return (
      <ButtonAsLink href={href} className={className}>
        編集する
      </ButtonAsLink>
    );
  }

  // 売り切れでなく、出品者でない場合
  return (
    <PurchaseButton
      item={item}
      userId={sessionUser?.id}
      className={className}
    />
  );
};
