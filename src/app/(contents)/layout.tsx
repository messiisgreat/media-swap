import {
  AgeCheckProvider,
  ListingButtonProvider,
} from "@/app/(contents)/_layout";

/**
 * (contents)のlayout
 */
const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
    <ListingButtonProvider />
    <AgeCheckProvider />
  </>
);

export default Layout;
