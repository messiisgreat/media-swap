import { Metadata } from "next";

import Carousel from "@/app/(contents)/listing/[id]/Carousel";
import { CommentSection } from "@/app/(contents)/listing/[id]/CommentSection";
import { ItemDescription } from "@/app/(contents)/listing/[id]/ItemDescription";
import { ItemInfomation } from "@/app/(contents)/listing/[id]/ItemInformation";
import { PurchaseButton } from "@/app/(contents)/listing/[id]/PurchaseButton";
import { findListingById } from "@/repositories/listing";
import { Badge } from "@/ui/Badge";
import { ButtonAsLink } from "@/ui/Button";
import { VerifyProvider } from "@/ui/form/securityVerifier/VerifyProvider";
import { Section, TitleUnderbar } from "@/ui/structure";
import { H } from "@/ui/structure/H";
import { getSessionUser } from "@/utils/session";

type ListingPageProps = {
  params: {
    id: string;
  };
};

/**
 * OGP生成
 */
export async function generateMetadata({
  params: { id },
}: ListingPageProps): Promise<Metadata> {
  const listing = await findListingById(id);
  return {
    title: listing.productName,
    description: listing.description,
    openGraph: {
      title: listing.productName!,
      description: listing.description!,
      images: {
        url: listing.images[0].imageURL,
        width: 1200,
        height: 630,
      },
    },
  };
}

/**
 * 商品ページ
 * @param param0.params.id 商品ID
 */
export default async function ListingPage({
  params: { id },
}: ListingPageProps) {
  const listing = await findListingById(id);
  const images = listing.images;
  const user = (await getSessionUser()) || null;
  const userId = user?.id;
  const isOwner = userId === listing.sellerId;

  return (
    <VerifyProvider>
      <Carousel images={images} />
      {/* FIXME: 本来は、w-fullを全体にかけたいが影響範囲が大きいため一時的にラップしている  */}
      <div className="w-full">
        <H className="text-left text-lg font-bold lg:text-2xl">
          {listing.productName!}
        </H>
      </div>
      <div className="w-full">
        <Badge className="badge-lg">¥{listing.price}</Badge>
      </div>
      <Section className="flex w-full flex-col items-start gap-4">
        <TitleUnderbar title="説明" />
        <ItemDescription description={listing.description} />
        <TitleUnderbar title="商品情報" />
        <ItemInfomation listing={listing} />
        {listing.transactionId ? (
          <ButtonAsLink
            href={`/transactions/${listing.transactionId}`}
            secondary
          >
            取引へ進む
          </ButtonAsLink>
        ) : (
          !isOwner && (
            <PurchaseButton
              listing={listing}
              buyerId={userId}
              userCouponId={null}
            />
          )
        )}
        <TitleUnderbar title="コメント" />
        <CommentSection
          listingId={listing.id}
          sessionUser={user}
          isListingOwner={isOwner}
        />
      </Section>
    </VerifyProvider>
  );
}
