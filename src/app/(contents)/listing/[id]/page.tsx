import { type Metadata } from "next";

import Carousel from "@/app/(contents)/listing/[id]/Carousel";
import { CommentSection } from "@/app/(contents)/listing/[id]/CommentSection";
import { ItemDescription } from "@/app/(contents)/listing/[id]/ItemDescription";
import { ItemInformation } from "@/app/(contents)/listing/[id]/ItemInformation";
import { LikeButton } from "@/app/(contents)/listing/[id]/_components/likeButton";
import TransactionButton from "@/app/(contents)/listing/[id]/_components/transactionButton";
import Toolbar from "@/app/(contents)/listing/[id]/_listingModal/Toolbar";
import { browsing } from "@/app/(contents)/listing/[id]/actions";
import { findListingById } from "@/repositories/listing";
import { Badge } from "@/ui/Badge";
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
      <Carousel isSoldOut={Boolean(listing.transaction?.id)} images={images} />
      <H className="w-full text-xl font-bold lg:text-2xl">
        {listing.productName!}
      </H>
      <Section className="grid w-full items-start gap-4">
        <div className="grid grid-cols-6 grid-rows-2 items-center justify-between">
          <Badge className="badge-lg col-span-5 w-full p-6">
            ¥{listing.price}
          </Badge>
          <Toolbar
            className="col-span-1"
            listingId={listing.id}
            sessionUser={user!}
            isListingOwner={isOwner}
          />
          <LikeButton
            className="col-span-3"
            listingId={listing.id}
            sessionUser={user!}
          />
          <TransactionButton listingId={id} className="col-span-3" />
        </div>
        <TitleUnderbar title="説明" />
        <ItemDescription description={listing.description} />
        <TitleUnderbar title="商品情報" />
        <ItemInformation listing={listing} />
        <TransactionButton listingId={id} />
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
