/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import Carousel from "@/app/listing/[id]/Carousel";
import CommentSection from "@/app/listing/[id]/CommentSection";
import { ProtButton } from "@/app/listing/[id]/ProtButton";
import { PurchaseButton } from "@/app/listing/[id]/PurchaseButton";
import { Badge } from "@/components/Badge";
import { ButtonAsLink } from "@/components/Button";
import SeoComponent from "@/components/GenerateMetadata";
import { VerifyProvider } from "@/components/securityVerifier/VerifyProvider";
import { H } from "@/components/structure/H";
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
  return SeoComponent({
    title: listing.productName!,
    description: listing.description!,
    imageUrl: listing.images[0].imageURL,
  });
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
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row lg:items-center">
          <Carousel images={images} />
          <div>
            <H className="text-5xl font-bold">{listing.productName}</H>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link key={tag.id} href={`/search?tagid=${tag.id}`}>
                  <Badge className="badge-lg cursor-pointer border-none bg-yellow-400 font-medium shadow-md">
                    {tag.text}
                  </Badge>
                </Link>
              ))}
            </div>
            <Badge className="mt-4">¥{listing.price}</Badge>
            <p className="py-6">{listing.description}</p>
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
          </div>
        </div>
      </div>
      <VerifyProvider>
        <CommentSection
          listingId={listing.id}
          sessionUser={user}
          isListingOwner={isOwner}
        />
      </VerifyProvider>
    </div>
  );
}
