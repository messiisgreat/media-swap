import Carousel from "@/app/listing/[id]/Carousel";
import { CommentSection } from "@/app/listing/[id]/CommentSection";
import {
  ItemDescription,
  ItemInfomation,
} from "@/app/listing/[id]/ItemInformation";
import { PurchaseButton } from "@/app/listing/[id]/PurchaseButton";
import { Badge } from "@/components/Badge";
import { ButtonAsLink } from "@/components/Button";
import { VerifyProvider } from "@/components/form/securityVerifier/VerifyProvider";
import { Section, TitleUnderbar } from "@/components/structure";
import { H } from "@/components/structure/H";
import { findListingById } from "@/services/listing";
import { getSessionUser } from "@/utils/session";
import { Metadata } from "next";

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
      <div className="flex justify-around">
        <H className="text-left text-lg font-bold lg:text-2xl">
          {listing.productName!}
        </H>
        <Badge className="badge-lg">¥{listing.price}</Badge>
      </div>
      <Section className="flex w-full flex-col items-start gap-4">
        <TitleUnderbar title="説明" />
        <ItemDescription listing={listing} />
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
              listingId={listing.id}
              buyerId={userId!}
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
