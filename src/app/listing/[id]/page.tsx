/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import CommentSection from "@/app/listing/[id]/CommentSection";
import { PurchaseButton } from "@/app/listing/[id]/PurchaseButton";
import { Badge } from "@/components/Badge";
import { H } from "@/components/structure/H";
import { findListingById } from "@/services/listing";
import { getSessionUser } from "@/utils/session";
import { Metadata } from "next";
import Image from "next/image";
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
      images: [{ url: listing.images[0].imageURL }],
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
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row lg:items-center">
          {/* TODO: カルーセルにしてimagesをmapで展開する */}
          <Image
            src={images[0].imageURL}
            alt={listing.productName!}
            width={500}
            height={500}
            className="rounded-lg"
            priority
          />
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
            <PurchaseButton
              disabled={!userId || isOwner}
              listingId={listing.id}
              buyerId={userId!}
              userCouponId={null}
            />
          </div>
        </div>
      </div>
      <CommentSection listingId={listing.id} sessionUser={user} />
    </div>
  );
}
