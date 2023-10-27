import { Badge } from "@/components/Badge";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import BuyItemButton from "./BuyItemButton";

type ProductPageProps = {
  params: {
    id: string;
  };
};

/**
 * キャッシュを使用して製品情報を取得
 *
 * @param {string} id - 取得対象の製品のID
 * @returns 取得した製品情報
 * @throws 製品が見つからない場合404になる
 */
const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

/**
 * キャッシュを使用して指定されたIDのタグ情報を取得
 *
 * @param {string[]} ids - 取得対象のタグのIDの配列
 * @returns 取得したタグ情報
 * 空の配列が返されることもある
 */
const getTags = cache(async (ids: string[]) => {
  if (!ids.length) return [];

  const tags = await prisma.tag.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return tags;
});

/**
 * OGP生成
 */
export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

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
  const product = await getProduct(id);
  const tags = await getTags(product.tagIds);

  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row lg:items-center lg:-ml-[12%]">
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
