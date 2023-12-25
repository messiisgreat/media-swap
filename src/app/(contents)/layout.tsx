import AgeCheckProvider from "@/app/(contents)/_layout/ageCheck";
import ItemButtonProvider from "@/app/(contents)/_layout/listingButton";

/**
 * (contents)のlayout
 */
const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
    <ItemButtonProvider />
    <AgeCheckProvider />
  </>
);

export default Layout;
