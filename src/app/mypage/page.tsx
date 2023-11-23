import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";

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
          <li className="border-b border-gray-200 bg-white px-4 py-2 transition-all duration-300 ease-in-out last:border-none hover:bg-sky-100 hover:text-sky-900">
            <Link href="/mypage/personal-info">
              <div className="flex justify-between">
                <p>個人情報設定</p>
                <FiChevronRight size={24} />
              </div>
            </Link>
            <Link href="/mypage/listings">
              <div className="flex justify-between">
                <p>出品商品一覧</p>
                <FiChevronRight size={24} />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
