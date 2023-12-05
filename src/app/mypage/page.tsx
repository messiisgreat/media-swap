import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { FiChevronRight } from "react-icons/fi";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import {
  PAGE_CONTENT,
  PAGE_CONTENT_ENUM_JA,
  PAGE_LINK,
} from "@/constants/myPage";

/**
 * ユーザーマイページ
 */
export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/mypage");
  }
  return (
    <div className="w-full">
      <div className="m-auto px-4 sm:px-8">
        <ul className="overflow-hidden rounded border border-gray-200 shadow-md">
          {Object.entries(PAGE_CONTENT).map(([, value]) => (
            <li
              key={PAGE_CONTENT_ENUM_JA[value]}
              className="border-b border-gray-200 bg-white px-4 py-2 transition-all duration-300 ease-in-out last:border-none hover:bg-sky-100 hover:text-sky-900"
            >
              <Link href={PAGE_LINK[value]}>
                <div className="flex justify-between">
                  <p>{PAGE_CONTENT_ENUM_JA[value]}</p>
                  <FiChevronRight size={24} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
