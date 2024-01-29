import { UserInfo } from "@/app/(contents)/user/[userId]/_conponents/UserInfo";
import { PublicItemListRenderer } from "@/features/publicItemList/PublicItemRenderer";
import {
  countItemsBySellerId,
  findItemsBySellerId,
  type ItemOrderBy,
} from "@/repositories/item";
import { type UserReadResult } from "@/repositories/user";
import { PaginationBar } from "@/ui";

type Props = {
  user: UserReadResult;
  isPublic?: boolean;
  page: number;
  size: number;
  sort: string;
  order: string;
};

/**
 * ユーザー情報を取得し、コンポーネントに渡す
 * @param user ユーザー情報
 */
export const UserInfoContainer = async ({
  user,
  isPublic,
  sort,
  order,
  page,
  size,
}: Props) => {
  const orderBy: ItemOrderBy = {
    [sort]: order,
  };
  const [items, count] = await Promise.all([
    findItemsBySellerId(user.id, page, size, orderBy, isPublic),
    countItemsBySellerId(user.id, isPublic),
  ]);
  const total = Math.ceil(count / size);
  return (
    <>
      <UserInfo user={user} count={count} />
      <PublicItemListRenderer items={items} />
      {total > 1 && <PaginationBar currentPage={page} totalPages={total} />}
    </>
  );
};
