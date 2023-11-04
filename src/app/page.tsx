import Link from "next/link";
import React from "react";
import { PaginationBar } from "../components/PaginationBar";
import { ProductCard } from "../components/ProductCard";
import { prisma } from "../lib/prisma";

type HomeProps = {
  searchParams: { page: string };
};

/**
 * TOPページ
 * @param param0.searchParams.page ページ番号
 */
export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentPage = parseInt(page);

  const pageSize = 6;
  const heroItemCount = 1;

  const totalItemCount = await prisma.product.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  return (
    <>
      <div className="my-4 grid grid-cols-3 gap-1">
        {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Link href="/add-product" className="btn btn-primary mb-4">
        出品する
      </Link>
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </>
  );
}
