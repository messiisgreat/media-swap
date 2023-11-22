/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import Carousel from "@/app/listing/[id]/Carousel";
import CommentSection from "@/app/listing/[id]/CommentSection";
import { ProtButton } from "@/app/listing/[id]/ProtButton";
import { PurchaseButton } from "@/app/listing/[id]/PurchaseButton";
import { Badge } from "@/components/Badge";
import { ButtonAsLink } from "@/components/Button";
import { VerifyProvider } from "@/components/securityVerifier/VerifyProvider";
import { PageTitle, Section, TitleUnderbar } from "@/components/structure";
import { findListingById } from "@/services/listing";
import { getSessionUser } from "@/utils/session";
import { Metadata } from "next";
import Link from "next/link";

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
  const tags = listing.tags.map((t) => t.tag);
  const images = listing.images;
  const user = (await getSessionUser()) || null;
  const userId = user?.id;
  const isOwner = userId === listing.sellerId; //出品者かどうかで表示を変えられるので、後で活用する

  return (
    <>
      <Carousel images={images} />
      <PageTitle title={listing.productName!} />
      <Section className="flex w-full flex-col items-start gap-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag.id} href={`/search?tagid=${tag.id}`}>
              <Badge className="badge-lg cursor-pointer border-none bg-yellow-400 font-medium shadow-md">
                {tag.text}
              </Badge>
            </Link>
          ))}
        </div>
        <Badge className="badge-lg">¥{listing.price}</Badge>
        <p>{listing.description}</p>
        {listing.transactionId ? (
          <div>
            <p>すでに商品を購入しています！</p>
            <ButtonAsLink
              href={`/transactions/${listing.transactionId}`}
              secondary
            >
              取引へ進む
            </ButtonAsLink>
          </div>
        ) : (
          <PurchaseButton
            disabled={!userId || isOwner}
            listingId={listing.id}
            buyerId={userId!}
            userCouponId={null}
          />
        )}
        <div className="mt-4 flex flex-col gap-2">
          <ProtButton data={listing} status={0}>
            支払前
          </ProtButton>
          <ProtButton data={listing} status={1}>
            支払完了
          </ProtButton>
          <ProtButton data={listing} status={2}>
            発送済
          </ProtButton>
          <ProtButton data={listing} status={3}>
            受取完了
          </ProtButton>
          <ProtButton data={listing} status={4}>
            取引キャンセル
          </ProtButton>
        </div>
      </Section>
      <TitleUnderbar title="コメント" />
      <VerifyProvider>
        <CommentSection
          listingId={listing.id}
          sessionUser={user}
          isListingOwner={isOwner}
        />
      </VerifyProvider>
    </>
  );
}
