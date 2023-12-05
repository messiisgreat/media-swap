import { useId } from "react";

import { Tag } from "@prisma/client";

import { PRODUCT_CONDITION } from "@/constants/listing";
import { ItemTagsInput } from "@/features/itemsFormContents/detailsContents/ItemTagsInput";
import { Select } from "@/ui/form";
import { LimitInput, LimitTextarea } from "@/ui/form/LimitElements";
import ImageInput from "@/ui/form/imageInput";
import { TitleUnderbar } from "@/ui/structure";
import { objToAssociative } from "@/utils/converter";

type Props = {
  productName: string;
  productConditionId: string;
  description: string;
  tags: Tag[];
  selectedTags?: Tag[];
};

/**
 * 商品の詳細情報を入力するフォームのコンポーネント
 *
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} props.productName - 商品名
 * @param {string} props.productConditionId - 商品の状態ID
 * @param {string} props.description - 商品の説明
 * @param {Tag[]} props.tags - タグのリスト
 * @param {Tag[]} [props.selectedTags] - 選択されたタグのリスト
 * @returns {React.Element} 商品の詳細情報を入力するフォームのエレメント
 */
export const DetailsContents = ({
  productName,
  productConditionId,
  description,
  tags,
  selectedTags,
}: Props) => {
  const imageInputId = useId();

  return (
    <div className="grid grid-cols-2 gap-3 [&>*]:col-span-2 [&>button]:col-span-1">
      <ImageInput
        labelText="出品画像(最大10枚)"
        id={imageInputId}
        name="imageFiles"
      />
      <LimitInput
        labelText="商品名"
        maxLength={32}
        name="productName"
        placeholder="商品名を入力してください"
        required
        defaultValue={productName}
      />
      <TitleUnderbar title="商品の説明" />
      <Select
        labelText="商品の状態"
        options={objToAssociative(PRODUCT_CONDITION)}
        name="productConditionId"
        required
        defaultValue={productConditionId}
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
};
