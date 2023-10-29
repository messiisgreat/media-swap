import { PaginationBar, ProductCard } from "@/components";
import { prisma } from "@/lib/db/prisma";
import Link from "next/link";

type HomeProps = {
  searchParams: { page: string };
};

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
    <div className="flex flex-col items-center">
      <div className="my-4 grid grid-cols-3 gap-4">
        {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link href="/add-product" className="btn btn-primary mb-4">
        Add Product
      </Link>
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
  </div>
  );
}
