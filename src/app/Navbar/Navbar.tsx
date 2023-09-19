import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png"

export default function Navbar() {
  return <div className="bg-base-100">
    <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl normal-case">
          <Image src={logo} height={40} width={40} alt="MediaSwap" />
          MediaSwap
        </Link>
      </div>
      <div className="flex-none gap-2">
        <form>
          <div className="form-control">
            <input
              name="searchQuery"
              placeholder="何をお探しですか？"
              className="input input-bordered w-full min-w-[100px]"
            />
          </div>
        </form>
      </div>
    </div>
  </div>;
}
