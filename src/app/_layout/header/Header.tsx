import { SearchWindow } from "@/app/_layout/header/SearchWindow";
import { TitleLogo } from "@/app/_layout/header/TitleLogo";
import UserMenuButton from "@/app/_layout/header/UserMenuButton";
import { getSessionUser } from "@/utils/session";

/**
 * サイトのヘッダー
 * @returns header
 */
export async function Header() {
  const sessionUser = await getSessionUser();

  return (
    <header className="navbar justify-around bg-base-100 p-1 md:p-4">
      <TitleLogo />
      <div className="flex gap-2">
        <SearchWindow />
        <UserMenuButton sessionUser={sessionUser} />
      </div>
    </header>
  );
}
