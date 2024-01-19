import { SignIn } from "@/app/(contents)/signin/SignIn";

/**
 * ログインページ
 * /signin
 */
const Page = ({ searchParams }: { searchParams: { callbackUrl?: string } }) => {
  const callbackUrl = searchParams.callbackUrl ?? "/";
  return <SignIn callbackUrl={callbackUrl} />;
};

export default Page;
