import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import logo from "@/assets/logo.png";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import UserMenuButton from "./UserMenuButton";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-base-100">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image src={logo} height={40} width={40} alt="Swappy" />
            Swappy
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="何をお探しですか？"
                className="input input-bordered w-full min-w-[100px]"
              />
            </div>
          </form>
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
}
