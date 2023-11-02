import { formatPrice } from "@/utils/format";
import { Listing } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./Badge";

type ListingCardProps = {
  product: Listing;
};

/**
 * 商品のカード
 * @param param0.product 商品
 * @returns 商品のカード
 */
export function ListingCard({ product }: ListingCardProps) {
  // 製品が作成されて7日以内
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link
      href={"/products/" + product.id}
      className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
    >
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.name}
          {isNew && <Badge variant="secondary">New</Badge>}
        </h2>
        <p>{product.description}</p>
        <Badge>{formatPrice(product.price)}</Badge>
      </div>
    </Link>
  );
}
