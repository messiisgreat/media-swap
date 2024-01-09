import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

import {
  PAGE_CONTENT as MY_PAGE_CONTENT,
  PAGE_CONTENT_ENUM_JA as MY_PAGE_CONTENT_ENUM_JA,
} from "@/constants/myPage";
import {
  PAGE_LINK,
  PAGE_CONTENT as PERSONAL_INFO_PAGE_CONTENT,
  PAGE_CONTENT_ENUM_JA as PERSONAL_INFO_PAGE_CONTENT_ENUM_JA,
} from "@/constants/personalInfoPage";
import { PageTitle } from "@/ui/structure";

/**
 * 個人情報設定
 * /mypage/personal-info
 */
const Page = () => (
  <>
    <PageTitle title={MY_PAGE_CONTENT_ENUM_JA[MY_PAGE_CONTENT.PERSONAL_INFO]} />
    <div className="w-full">
      <div className="m-auto px-4 sm:px-8">
        <ul className="overflow-hidden rounded border border-gray-200 shadow-md">
          {Object.values(PERSONAL_INFO_PAGE_CONTENT).map((value) => (
            <li
              key={PERSONAL_INFO_PAGE_CONTENT_ENUM_JA[value]}
              className="border-b border-gray-200 bg-white px-4 py-2 transition-all duration-300 ease-in-out last:border-none hover:bg-sky-100 hover:text-sky-900"
            >
              <Link href={PAGE_LINK[value]}>
                <div className="flex justify-between">
                  <p>{PERSONAL_INFO_PAGE_CONTENT_ENUM_JA[value]}</p>
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

export default Page;
