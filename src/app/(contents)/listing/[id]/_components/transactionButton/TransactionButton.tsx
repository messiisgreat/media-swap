import PurchaseButton from "@/app/(contents)/listing/[id]/_components/transactionButton/purchaseButton";
import { findListingById } from "@/repositories/listing";
import { Button, ButtonAsLink } from "@/ui/Button";
import { getSessionUser } from "@/utils";

type Props = {
  /** 商品ID */
  listingId: string;
  /** className */
  className?: string;
};

/**
 * 売約状況とログインしているユーザーで表示を変えるボタン
 * @returns button
 */
export const TransactionButton = async ({
  listingId,
  className = "",
}: Props) => {
  const listing = await findListingById(listingId);
  const sessionUser = await getSessionUser();
  const isSold = Boolean(listing.transaction?.id);
  const isSeller = sessionUser?.id === listing.sellerId;
  const isBuyer = sessionUser?.id === listing.transaction?.buyerId;

  // 売り切れかつ出品者または購入者の場合
  if (listing.transaction && isSold && (isSeller || isBuyer)) {
    return (
      <ButtonAsLink
        href={`/transactions/${listing.transaction.id}`}
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
      <ButtonAsLink href={`/listings/edit/${listing.id}`} className={className}>
        編集する
      </ButtonAsLink>
    );
  }

  // 売り切れでなく、出品者でない場合
  return (
    <PurchaseButton
      listing={listing}
      sessionUserId={sessionUser?.id}
      className={className}
    />
  );
};
