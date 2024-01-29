import { type Tag } from "@prisma/client";

import { CONDITION } from "@/constants/item";
import { ItemTagsInput } from "@/features/itemsFormContents/detailsContents/itemTags/ItemTagsInput";
import { Select } from "@/ui/form";
import { ImageInput } from "@/ui/form/imageInput";
import { LimitInput, LimitTextarea } from "@/ui/form/inputs/LimitElements";
import { TitleUnderbar } from "@/ui/structure";

type Props = {
  /** 商品名 */
  name: string;
  /** 商品の状態コード */
  conditionCode: string;
  /** 商品の説明 */
  description: string;
  /** タグの配列 */
  tags: Tag[];
  /** 選択されたタグの配列 */
  selectedTags?: Tag[];
};

/**
 * 商品の詳細情報を入力するフォームのコンポーネント
 * @returns 商品の詳細情報を入力するフォームのエレメント
 */
export const DetailsContents = ({
  name,
  conditionCode,
  description,
  tags,
  selectedTags,
}: Props) => (
  <div className="grid grid-cols-2 gap-3 [&>*]:col-span-2 [&>button]:col-span-1">
    <ImageInput labelText="出品画像(最大10枚)" required name="imageFiles" />
    <LimitInput
      labelText="商品名"
      maxLength={32}
      name="name"
      placeholder="商品名を入力してください"
      required
      defaultValue={name}
    />
    <TitleUnderbar title="商品の説明" />
    <Select
      labelText="商品の状態"
      options={CONDITION}
      name="conditionCode"
      required
      defaultValue={conditionCode}
    />
    <LimitTextarea
      labelText="商品の説明"
      name="description"
      placeholder={`内容、サイズ、ページ数、発行年月日、注意事項など\n\n例）2018年に制作した同人誌です。B5サイズで全30ページ。内容はファンタジー要素が満載で、読み応え抜群です。一部ページに軽微な折れがありますが、全体的に状態は良好です。お求めやすい価格で提供していますので、ぜひご検討ください。`}
      required
      maxLength={1000}
      rows={10}
      defaultValue={description}
    />
    <ItemTagsInput
      suggestedTags={tags}
      name="tags"
      selectedTags={selectedTags}
    />
  </div>
);
