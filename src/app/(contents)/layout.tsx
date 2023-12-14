import AgeCheckProvider from "@/app/(contents)/_layout/ageCheck";
import ItemButtonProvider from "@/app/(contents)/_layout/listingButton";

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
      <ItemButtonProvider />
      <AgeCheckProvider />
    </>
  );
}
