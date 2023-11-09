import Link from "next/link";
import React from "react";
import { ListingCard } from "../components/ListingCard";
import { PaginationBar } from "../components/PaginationBar";
import prisma from "../lib/prisma";
import { ListingOrderBy, findListings } from "../services/listing";

type HomeProps = {
  searchParams: {
    query: string;
    page: number;
    size: number;
    sort: string;
    order: "asc" | "desc";
  };
};

/**
 * TOPページ
 * @param param0.searchParams.page ページ番号
 */
export default async function Home({
  searchParams: { page = 1, size = 27, sort = "createdAt", order = "desc" },
}: HomeProps) {
  const orderBy: ListingOrderBy = {
    [sort]: order,
  };
  const heroItemCount = 1;

  const totalItemCount = await prisma.listing.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / size);

  // findListings はリストを返すと仮定しています
  const listings = await findListings(page, size, orderBy);
  return (
    <>
      <div className="my-4 grid grid-cols-3 gap-1">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      <Link href="/add-listing" className="btn btn-primary mb-4">
        出品する
      </Link>
      {totalPages > 1 && (
        <PaginationBar currentPage={page} totalPages={totalPages} />
      )}
    </>
  );
}
