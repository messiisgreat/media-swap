import { SignIn } from "@/app/(contents)/signin/SignIn";

/**
 * ログインページ
 * /signin
 */
export default function Page({ params }: { params: { callbackUrl?: string } }) {
  const callbackUrl = params.callbackUrl ?? "/";
  return <SignIn callbackUrl={callbackUrl} />;
}
