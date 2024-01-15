import { type UserReadResult } from "@/repositories/user";
import Image from "next/image";

/**
 * ユーザー情報を表示する
 * @param user ユーザー情報
 * @returns div
 */
export const UserInfo = ({
  user,
  count,
}: {
  user: UserReadResult;
  count: number;
}) => (
  <div className="flex w-full items-center border-b-2 border-gray-300 pb-2">
    <Image
      src={user?.image ?? ""}
      alt="プロフィール画像"
      width={100}
      height={100}
      className="!static rounded-full"
    />
    <div className="flex-1 pl-5">
      <p className="text-lg font-bold">{user.name}</p>
      <p>
        出品数<span className="text-xl font-bold">{count}</span>
      </p>
    </div>
  </div>
);
