"use client";

import { useRouter } from "next/navigation";

/**
 * トップページにページをリダイレクトする
 * /item
 */
const Page = () => {
  const router = useRouter();
  router.push("/");
};

export default Page;
