import { TitleUnderbar } from "@/ui/structure";

/**
 * アイテム編集ページ
 * /items/edit/[itemId]
 */
const Page = ({ params: { itemId } }: { params: { itemId: string } }) => (
  <TitleUnderbar title={itemId} />
);

export default Page;
