import { ListingCard, PaginationBar } from "@/components";
import prisma from "@/lib/prisma";
import { findListings } from "@/services/listing";
import Image from "next/image";
import Link from "next/link";

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
  searchParams: { page = 1, size = 27 },
}: HomeProps) {
  const heroItemCount = 1;

  const totalItemCount = await prisma.listing.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / size);

  const listings = await findListings(page, size);
  return (
    <>
      {page === 1 && listings[0] && (
        <div className="m-3 w-full  rounded-xl bg-base-200 p-0">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={listings[0].images[0]?.image.imageURL || ""}
              alt={listings[0].productName!}
              width={400}
              height={800}
              className="w-full  rounded-lg shadow-2xl"
              priority
            />
            <div className="w-full">
              <h1 className="text-5xl font-bold">{listings[0].productName}</h1>
              <p className="py-6">{listings[0].description}</p>
              <Link
                href={`/listing/${listings[0].id}`}
                className="btn btn-primary"
              >
                詳細を見る
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(page === 1 ? listings.slice(1) : listings).map((listing) => (
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
