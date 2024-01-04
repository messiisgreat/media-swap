import Image from "next/image";
import Link from "next/link";

import { findItemById } from "@/repositories/item";
import { Button } from "@/ui/Button";

/**
 * 出品完了した商品の画像とリンク
 * @param itemId 商品ID
 * @returns
 */
export const CompletedItem = async ({ itemId }: { itemId: string }) => {
  const item = await findItemById(itemId);
  return (
    <Link
      href={`/item/${encodeURIComponent(itemId)}`}
      className="grid justify-center gap-4"
    >
      <Image
        src={item.images[0]?.imageURL || ""}
        alt={item.name}
        width={400}
        height={400}
        className="w-40 rounded-full shadow-2xl"
      />
      <Button>商品ページへ</Button>
    </Link>
  );
};
