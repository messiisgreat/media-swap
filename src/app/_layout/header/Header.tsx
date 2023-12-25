import { SearchWindow } from "@/app/_layout/header/SearchWindow";
import { SignInButton } from "@/app/_layout/header/SignInButton";
import { TitleLogo } from "@/app/_layout/header/TitleLogo";
import { UserMenuButton } from "@/app/_layout/header/menuButton";
import { getSessionUser } from "@/utils/session";

/**
 * サイトのヘッダー
 * @returns header
 */
export const Header = async () => {
  const sessionUser = await getSessionUser();

  return (
    <header className="navbar flex justify-center bg-base-100 p-4">
      <div className="flex w-full justify-between gap-2 sm:max-w-xl">
        <TitleLogo />
        <SearchWindow />
        {sessionUser ? (
          <UserMenuButton sessionUser={sessionUser} />
        ) : (
          <SignInButton />
        )}
      </div>
    </header>
  );
};
