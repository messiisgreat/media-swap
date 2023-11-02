/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import { Badge } from "@/components/Badge";
import { findListing } from "@/services/product";
import { findTagsByIds } from "@/services/tag";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BuyItemButton from "./BuyItemButton";

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
  const product = await findListing(id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
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
  const product = await findListing(id);
  const tags = await findTagsByIds(product.tagIds);

  return (
    <div className="hero">
      <div className="hero-content flex-col lg:-ml-[12%] lg:flex-row lg:items-center">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-lg"
          priority
        />

        <div>
          <h1 className="text-5xl font-bold">{product.name}</h1>
          {/* <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag.id} className="bg-yellow-400 px-3 py-1 rounded-full font-medium shadow-md">
              {tag.name}
            </span>
          ))}
        </div> */}
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag.id} href={`/search?tagid=${tag.id}`}>
                <Badge className="badge-lg cursor-pointer border-none bg-yellow-400 font-medium shadow-md">
                  {tag.text}
                </Badge>
              </Link>
            ))}
          </div>
          <Badge className="mt-4">¥{product.price}</Badge>
          <p className="py-6">{product.description}</p>
          <BuyItemButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}
