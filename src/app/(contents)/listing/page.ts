"use client";

import { useRouter } from "next/navigation";

/**
 * トップページにページをリダイレクトする
 * /listing
 */
const Page = () => {
  const router = useRouter();
  router.push("/");
};

export default Page;
