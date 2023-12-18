import { PAGE_CONTENT, PAGE_CONTENT_ENUM_JA } from "@/constants/myPage";
import { PageTitle } from "@/ui/structure";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

import {
  PAGE_LINK,
  PAGE_CONTENT as WITHDRAWAL_PAGE_CONTENT,
  PAGE_CONTENT_ENUM_JA as WITHDRAWAL_PAGE_CONTENT_ENUM_JA,
} from "@/constants/withdrawalPage";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

/**
 * 出金ページ
 * /mypage/withdrawal
 */
export default async function Page() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <>
      <PageTitle title={PAGE_CONTENT_ENUM_JA[PAGE_CONTENT.WITHDRAWAL]} />
      <div className="w-full">
        <div className="m-auto px-4 sm:px-8">
          <ul className="overflow-hidden rounded border border-gray-200 shadow-md">
            {Object.entries(WITHDRAWAL_PAGE_CONTENT).map(([, value]) => (
              <li
                key={WITHDRAWAL_PAGE_CONTENT_ENUM_JA[value]}
                className="border-b border-gray-200 bg-white px-4 py-2 transition-all duration-300 ease-in-out last:border-none hover:bg-sky-100 hover:text-sky-900"
              >
                <Link href={PAGE_LINK[value]}>
                  <div className="flex justify-between">
                    <p>{WITHDRAWAL_PAGE_CONTENT_ENUM_JA[value]}</p>
                    <FiChevronRight size={24} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
