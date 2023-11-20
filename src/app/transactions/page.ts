"use client";

import { useRouter } from "next/navigation";

/**
 * トップページにページをリダイレクトする
 * /transactions
 */
const Page = () => {
  const router = useRouter();
  router.push("/");
};

export default Page;
