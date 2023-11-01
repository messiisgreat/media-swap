import { Badge } from "@/components/Badge";
import { findProduct } from "@/services/product";
import { findTagsByIds } from "@/services/tag";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BuyItemButton from "./BuyItemButton";
import CommentSection from "@/app/products/[id]/CommentSection";
import { getServerSession } from "next-auth";

type ProductPageProps = {
  params: {
    id: string;
  };
};

/**
 * OGP生成
 */
export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await findProduct(id);

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
export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await findProduct(id);
  const tags = await findTagsByIds(product.tagIds);
  const session = await getServerSession();

  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col gap-8 lg:flex-row lg:items-center">
          <Image
            src={product.imageUrl}
            alt={product.name}
//            width={500}
//            height={500}
            className="!static rounded-lg object-contain lg:max-w-lg flex-1"
            fill
            priority
          />

          <div className="flex-1">
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
      <CommentSection productId={product.id} session={session} />
    </div>
  );
}
