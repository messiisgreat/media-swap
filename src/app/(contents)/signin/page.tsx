import { SignIn } from "@/app/(contents)/signin/SignIn";

/**
 * ログインページ
 * /signin
 */
const Page = ({ params }: { params: { callbackUrl?: string } }) => {
  const callbackUrl = params.callbackUrl ?? "/";
  return <SignIn callbackUrl={callbackUrl} />;
};

export default Page;
