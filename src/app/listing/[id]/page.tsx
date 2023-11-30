import Carousel from "@/app/listing/[id]/Carousel";
import { CommentSection } from "@/app/listing/[id]/CommentSection";
import { PurchaseButton } from "@/app/listing/[id]/PurchaseButton";
import Toolbar from "@/app/listing/[id]/_listingModal/Toolbar";
import { Badge } from "@/components/Badge";
import { ButtonAsLink } from "@/components/Button";
import { VerifyProvider } from "@/components/form/securityVerifier/VerifyProvider";
import { Section, TitleUnderbar } from "@/components/structure";
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
  const isOwner = userId === listing.sellerId;
  const price = listing.price?.toLocaleString();
  const shippingMethod = listing.postageIsIncluded ? "送料込み" : "着払い";

  return (
    <VerifyProvider>
      <Carousel images={images} />
      {/* FIXME: 本来は、w-fullを全体にかけたいが影響範囲が大きいため一時的にラップしている  */}
      <div className="w-full">
        <H className="text-left text-lg font-bold lg:text-2xl">
          {listing.productName!}
        </H>
      </div>
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
        <div>
          <span className="text-sm text-neutral-400">¥</span>
          <span className="text-2xl">{price}</span>
          <span className="pl-1 text-sm">{shippingMethod}</span>
        </div>
        <div className="flex w-full justify-end">
          <Toolbar
            listingId={listing.id}
            sessionUser={user}
            isListingOwner={isOwner}
          />
        </div>
        <H className="text-lg font-bold text-neutral-400">商品の説明</H>
        <pre className="whitespace-pre-wrap text-base">
          {listing.description}
        </pre>
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
          !isOwner && (
            <PurchaseButton
              listingId={listing.id}
              buyerId={userId!}
              userCouponId={null}
            />
          )
        )}
      </Section>
      <TitleUnderbar title="コメント" />
      <CommentSection
        listingId={listing.id}
        sessionUser={user}
        isListingOwner={isOwner}
      />
    </VerifyProvider>
  );
}
