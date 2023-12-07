import AgeCheckProvider from "@/app/(contents)/_layout/ageCheck";
import ListingButtonProvider from "@/app/(contents)/_layout/listingButton";

/**
 * (contents)のlayout
 */
export default function ContentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ListingButtonProvider />
      <AgeCheckProvider />
    </>
  );
}
