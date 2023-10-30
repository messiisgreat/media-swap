"use client";

import { useRouter } from "next/navigation";

/**
 * トップページにページをリダイレクトする
 * /products
 */
const Page = () => {
  const router = useRouter();
  router.push("/");
};

export default Page;
