import { AuthRedirect } from "@/app/(contents)/(auth)/AuthRedirect";
import { getSessionUser } from "@/utils";
import { type ReactNode } from "react";

/**
 * ログインしていない場合はログインページにリダイレクトする
 */
const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getSessionUser();
  return (
    <>
      {user ? null : <AuthRedirect />}
      {children}
    </>
  );
};

export default Layout;
