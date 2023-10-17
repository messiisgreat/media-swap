import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import BuyItemButton from "./BuyItemButton";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

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

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name + " - Swappy",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);
  const tags = await getTags(product.tagIds);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
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
              <span className="cursor-pointer rounded-full bg-yellow-400 px-3 py-1 font-medium shadow-md">
                {tag.name}
              </span>
            </Link>
          ))}
        </div>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <BuyItemButton productId={product.id} />
      </div>
    </div>
  );
}
