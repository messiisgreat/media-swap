import Carousel from "@/app/listing/[id]/Carousel";
import { CommentSection } from "@/app/listing/[id]/CommentSection";
import { PurchaseButton } from "@/app/listing/[id]/PurchaseButton";
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
  const isOwner = userId === listing.sellerId; //出品者かどうかで表示を変えられるので、後で活用する
  const dtClass = "my-2 w-full rounded-lg bg-white p-4 shadow-md";
  const ddClass = "font-semibold text-gray-700";
  const ddColor = "text-gray-600";

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
        <Badge className="badge-lg">¥{listing.price}</Badge>
        <TitleUnderbar title="説明" />
        <div className={dtClass}>
          <p className="my-4 text-gray-600">{listing.description}</p>
        </div>
        <TitleUnderbar title="商品情報" />
        <div className={dtClass}>
          <div className="mb-4">
            <p className={ddClass}>商品の状態</p>
            <p className={ddColor}>{listing.productCondition?.name}</p>
          </div>
          <div className="mb-4">
            <p className={ddClass}>タグ名</p>
            <div className="flex flex-wrap gap-2">
              {listing.tags.map((tag) => (
                <p
                  key={tag.id}
                  className="rounded-full bg-blue-100 px-2 py-1 text-blue-800"
                >
                  {tag.tag.text}
                </p>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2">
              <p className={ddClass}>配送方法</p>
              <p className={ddColor}>{listing.shippingMethod?.name}</p>
              <p className={ddClass}>送料の負担について</p>
              <p className={ddColor}>
                {listing.shippingMethod?.amount
                  ? "送料別(購入者負担)"
                  : "送料込み(出品者負担)"}
              </p>
              <p className={ddClass}>配送までの日数</p>
              <p className={ddColor}>{listing.shippingDays?.maxDays}日以内</p>
            </div>
          </div>
        </div>
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
