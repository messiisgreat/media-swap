import PurchaseButton from "@/app/(contents)/item/[id]/_components/transactionButton/purchaseButton";
import { findItemById } from "@/repositories/item";
import { Button, ButtonAsLink } from "@/ui/Button";
import { getSessionUser } from "@/utils";

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
    return (
      <ButtonAsLink
        href={`/transactions/${item.transaction.id}`}
        className={className}
      >
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
    return (
      <ButtonAsLink href={`/items/edit/${item.id}`} className={className}>
        編集する
      </ButtonAsLink>
    );
  }

  // 売り切れでなく、出品者でない場合
  return (
    <PurchaseButton
      item={item}
      sessionUserId={sessionUser?.id}
      className={className}
    />
  );
};
