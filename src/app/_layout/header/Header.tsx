import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { SearchWindow } from "@/app/_layout/header/SearchWindow";
import { TitleLogo } from "@/app/_layout/header/TitleLogo";
import { getServerSession } from "next-auth";
import UserMenuButton from "./UserMenuButton";

export async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-base-100">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <TitleLogo className="flex-1" />
        <div className="flex-none gap-2">
          <SearchWindow />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
}
