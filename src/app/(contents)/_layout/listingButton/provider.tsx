"use client";

import { usePathname } from "next/navigation";

import { ListingButton } from "@/app/(contents)/_layout/listingButton/ListingButton";

/**
 * 出品ボタンを特定のpath以外で返す
 *
 * @returns 出品ボタン
 */
export const ListingButtonProvider = () => {
  const pathname = usePathname();
  if (pathname === "/add-item") return null;
  return <ListingButton className="fixed right-8 top-2 z-10 max-md:hidden" />;
};
