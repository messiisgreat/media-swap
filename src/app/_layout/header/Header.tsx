import { SearchWindow } from "@/app/_layout/header/SearchWindow";
import { TitleLogo } from "@/app/_layout/header/TitleLogo";
import UserMenuButton from "@/app/_layout/header/UserMenuButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

/**
 * サイトのヘッダー
 * @returns header
 */
export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="navbar justify-around bg-base-100 p-1 md:p-4">
      <div>
        <TitleLogo />
      </div>
      <div className="flex gap-2">
        <SearchWindow />
        <UserMenuButton session={session} />
      </div>
    </header>
  );
}
