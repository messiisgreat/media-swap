import { PublicItemListRenderer } from "@/features/publicItemList/PublicItemRenderer";
import {
  countItems,
  countItemsByProductName,
  findItems,
  findItemsByProductName,
  type ItemOrderBy,
  type ItemsReadResult,
} from "@/repositories/item";
import { PaginationBar } from "@/ui";

type Props = {
  page: number;
  size: number;
  sort: string;
  order: string;
  query?: string;
};

/**
 * 渡されたパラメータに応じて取得するデータを選択する
 * @param props page, size, sort, order, query, buyerId, sellerId, isPublic, userId
 * @returns [商品の配列, 商品数]
 */
const finditemsAndCount = ({
  page,
  size,
  sort,
  order,
  query,
}: Props): Promise<[ItemsReadResult, number]> => {
  const orderBy: ItemOrderBy = {
    [sort]: order,
  };
  // 検索結果
  if (query) {
    return Promise.all([
      findItemsByProductName(query, page, size, orderBy),
      countItemsByProductName(query),
    ]);
    // 全商品一覧
  } else {
    return Promise.all([findItems(page, size, orderBy), countItems()]);
  }
};

/**
 * データ取得が責務のコンテナ
 * @param props page, size, sort, order, query
 */
export const PublicItemListContainer = async (props: Props) => {
  const [items, count] = await finditemsAndCount(props);
  const total = Math.ceil(count / props.size);
  return (
    <>
      <PublicItemListRenderer items={items} />
      {total > 1 && (
        <PaginationBar currentPage={props.page} totalPages={total} />
      )}
    </>
  );
};
