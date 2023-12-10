import { type Metadata } from "next";

import Carousel from "@/app/(contents)/listing/[id]/Carousel";
import { CommentSection } from "@/app/(contents)/listing/[id]/CommentSection";
import { ItemDescription } from "@/app/(contents)/listing/[id]/ItemDescription";
import { ItemInformation } from "@/app/(contents)/listing/[id]/ItemInformation";
import { PurchaseButton } from "@/app/(contents)/listing/[id]/PurchaseButton";
import { LikeButton } from "@/app/(contents)/listing/[id]/_components/likeButton";
import Toolbar from "@/app/(contents)/listing/[id]/_listingModal/Toolbar";
import { browsing } from "@/app/(contents)/listing/[id]/actions";
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
  const [listing, user] = await Promise.all([
    findListingById(id),
    getSessionUser(),
  ]);
  const images = listing.images;
  const userId = user?.id;
  const isOwner = userId === listing.sellerId;
  await browsing(listing.id, userId as string);

  return (
    <VerifyProvider>
      <Carousel images={images} />
      <H className="w-full text-xl font-bold lg:text-2xl">
        {listing.productName!}
      </H>
      <Section className="grid w-full items-start gap-4">
        <Badge className="badge-lg">¥{listing.price}</Badge>
        <div className="flex w-full items-center justify-between">
          <LikeButton listingId={listing.id} sessionUser={user!} />
          <Toolbar
            listingId={listing.id}
            sessionUser={user!}
            isListingOwner={isOwner}
          />
        </div>
        <TitleUnderbar title="説明" />
        <ItemDescription description={listing.description} />
        <TitleUnderbar title="商品情報" />
        <ItemInformation listing={listing} />
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
          sessionUser={user ?? null}
          isListingOwner={isOwner}
        />
      </Section>
    </VerifyProvider>
  );
}
